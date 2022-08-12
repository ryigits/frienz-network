const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const bcrypt = require("./bcrypt");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const { uploader } = require("./multer");
const s3 = require("./s3");
// const { userLogIn, userLogOut } = require("./middleware");
app.use(express.json());

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
}

if (process.env.NODE_ENV == "production") {
    sessionSecret = process.env.SESSION_SECRET;
} else {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
}
const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("./secrets.json").COOKIE_SECRET;

const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true,
    })
);
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.id,
    });
});

app.get("/profile", function (req, res) {
    db.getUserById(req.session.id).then((userData) => {
        const { first_name, last_name, profilepic, bio } = userData.rows[0];
        res.json({
            first: first_name,
            last: last_name,
            bio: bio,
            url: profilepic,
        });
    });
});

app.get("/recentusers", (req, res) => {
    db.getRecentUsers().then((users) => {
        res.json(users.rows);
    });
});

app.get("/user/:firstName.json", (req, res) => {
    const { firstName } = req.params;

    db.getSearchUsers(firstName).then((userData) => {
        res.json(userData.rows);
    });
});

app.get("/users/:id.json", (req, res) => {
    const { id } = req.params;
    db.getUserById(id).then((data) => {
        const userData = data.rows[0];
        res.json(userData);
    });
});

app.get("/closefriend/:id.json", (req, res) => {
    const user1 = req.session.id;
    const user2 = req.params.id;
    db.findCloseFriends(user1, user2).then((data) => {
        if (data.rowCount === 0) {
            return res.json({ result: "not found" });
        } else {
            console.log(data.rows);
            res.json(data.rows[0]);
        }
    });
});

app.post("/addCloseFriend", async (req, res) => {
    const result = await db.addCloseFriend(req.session.id, req.body.id);
    res.json(result.rows[0]);
});
app.post("/removeCloseFriend", async (req, res) => {
    await db.removeCloseFriend(req.body.id, req.session.id);
    res.json({ result: "not found" });
});
app.post("/acceptCloseFriend", async (req, res) => {
    console.log(req.body);
    const result = await db.acceptCloseFriend(req.body.id, req.session.id);
    res.json(result.rows[0]);
});

app.get("/friendship/:id.json", (req, res) => {
    const user1 = req.session.id;
    const user2 = req.params.id;
    db.findFriendship(user1, user2).then((data) => {
        if (data.rowCount === 0) {
            return res.json({ result: "not found" });
        } else {
            res.json(data.rows[0]);
        }
    });
});

app.post("/friendship/add.json", (req, res) => {
    const sender_id = req.session.id;
    const { receiver_id } = req.body;
    db.addFriend(sender_id, receiver_id).then(() => {
        res.json({ success: true });
    });
});

app.post("/friendship/accept.json", (req, res) => {
    const { id } = req.body;
    db.acceptFriendShipRequest(id).then(() => {
        res.json({ success: true });
    });
});

app.post("/friendship/remove.json", (req, res) => {
    const { id } = req.body;
    console.log(id);
    db.removeFriend(id).then(() => {
        res.json({ success: true });
    });
});

app.post("/bio", (req, res) => {
    db.updateBio(req.session.id, req.body.bioData).then(() => {
        res.json({ success: true });
    });
});

app.post("/register.json", (req, res) => {
    const { first, last, email, password } = req.body;

    bcrypt.hash(password).then((password_hash) => {
        db.addUser(first, last, email, password_hash)
            .then((user_id) => {
                let id = user_id.rows[0].user_id;
                req.session.id = id;
                res.json({
                    success: true,
                    id: id,
                });
            })
            .catch(() => {
                res.json({
                    success: false,
                });
            });
    });
});

app.post("/sendCodeBeforeResetPassword", (req, res) => {
    const { email } = req.body;
    const code = cryptoRandomString({ length: 4 });

    db.addCodeIntoDb(email, code).then(() => {
        ses.sendCodeToEmail(code, email).then(() => {
            res.json({
                email: email,
                code: code,
            });
        });
    });
});

app.post("/resetPasswordWithCode", (req, res) => {
    const { code, newPassword, email } = req.body;
    db.getCodesFromDb().then((codes) => {
        if (codes.rows.map((item) => item.code).includes(code)) {
            bcrypt.hash(newPassword).then((password_hash) => {
                db.changePasswordByEmail(email, password_hash).then(() => {
                    res.json({
                        success: true,
                    });
                });
            });
        }
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.authUser(email, password).then((result) => {
        if (result) {
            db.getUserByEmail(email).then((user) => {
                req.session.id = user.id;
                res.json({
                    success: true,
                });
            });
        }
    });
});

app.post("/image", uploader.single("photo"), s3.upload, (req, res) => {
    const url = `https://frienznetwork.s3.amazonaws.com/${req.file.filename}`;
    if (req.file) {
        db.addProfilePic(req.session.id, url).then(() => {
            res.json({
                success: true,
                url: url,
            });
        });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.json({ logout: true });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
