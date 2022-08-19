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

////// this is our socket.io boilerplate  //////
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
//////////////////////////////////////////////

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
const cookieSessionMiddleware = cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: true,
});
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.id,
    });
});

app.get("/profile", function (req, res) {
    db.getUserById(req.session.id).then((userData) => {
        const { first_name, last_name, profilepic, bio, email } =
            userData.rows[0];
        res.json({
            id: req.session.id,
            first: first_name,
            last: last_name,
            bio: bio,
            url: profilepic,
            email: email,
        });
    });
});

app.get("/closefriends/getall", async (req, res) => {
    const allFriend = await db.getAllCloseFriendsAndWannabes(req.session.id);
    res.json(allFriend.rows);
});

app.get("/getalldirectmessages/:userId", async (req, res) => {
    const { userId } = req.params;
    const messages = await db
        .findDirectMessages(userId, req.session.id)
        .then((result) => result.rows);
    res.json(messages);
});

app.get("/recentusers", (req, res) => {
    db.getRecentUsers().then((users) => {
        const filteredUser = users.rows.filter(
            (user) => user.id != req.session.id
        );
        res.json(filteredUser);
    });
});

app.get("/user/:firstName.json", (req, res) => {
    const { firstName } = req.params;
    db.getSearchUsers(firstName).then((userData) => {
        const filteredUser = userData.rows.filter(
            (user) => user.id != req.session.id
        );
        res.json(filteredUser);
    });
});

app.get("/users/:id.json", (req, res) => {
    const { id } = req.params;
    if (Number(req.params.id) === req.session.id) {
        return res.json({ forbidden: true });
    } else {
        return db.getUserById(id).then((data) => {
            const userData = data.rows[0];
            res.json(userData);
        });
    }
});

app.get("/closefriend/:id.json", (req, res) => {
    const user1 = req.session.id;
    const user2 = req.params.id;
    db.findCloseFriends(user1, user2).then((data) => {
        if (data.rowCount === 0) {
            return res.json({ result: "not found" });
        } else {
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
    const result = await db.acceptCloseFriend(req.body.id, req.session.id);
    res.json(result.rows[0]);
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

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
let onlineUsers = [];

io.on("connection", async (socket) => {
    if (!socket.request.session.id) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.id;
    // console.log(
    //     `Socket with id: ${socket.id} has connected on UserId: ${userId}`
    // );

    const onlineUser = { id: userId, socket: socket.id };
    if (onlineUsers.every((element) => element.id !== userId)) {
        onlineUsers.push(onlineUser);
    }

    console.log("Currently Online Users", onlineUsers);
    const onlineUsersInfo = await db
        .getUsersByIds(onlineUsers.map((e) => e.id))
        .then((result) => result.rows);
    io.emit("online-users", onlineUsersInfo);

    const messageArray = await db.getRecentMessages().then((data) => data.rows);
    socket.emit("messages", messageArray);
    socket.on("new-message", async (text) => {
        const { first_name, profilepic } = await db
            .getUserById(userId)
            .then((result) => result.rows[0]);

        const message = await db
            .addNewMessages(userId, first_name, profilepic, text)
            .then((result) => result.rows);
        io.emit("messages", message);
    });


    socket.on("get-all-direct-messages", async (paramsId) => {
        const messages = await db
            .findDirectMessages(paramsId, userId)
            .then((result) => result.rows);

        socket.emit("direct-messages", messages);
    });
    socket.on("new-direct-message", async (message) => {
        const { first_name, profilepic } = await db
            .getUserById(userId)
            .then((result) => result.rows[0]);

        let directMessage = await db
            .addDirectMessage(
                userId,
                message.receiverId,
                message.text,
                profilepic,
                first_name
            )
            .then((result) => result.rows[0]);
        await onlineUsers.forEach((e) => {
            if (e.id === Number(message.receiverId)) {
                io.to(e.socket).emit("direct-messages", directMessage);
            }
        });
        socket.emit("direct-messages", directMessage);
    });

    // this will run every time a socket disconnect
    socket.on("disconnect", async () => {
        console.log(
            `Socket with id: ${socket.id} and userId:${userId} just disconnected!`
        );
        onlineUsers = await onlineUsers.filter(
            (element) => element.id != userId
        );
        const onlineUsersInfo = await db
            .getUsersByIds(onlineUsers.map((e) => e.id))
            .then((result) => result.rows);
        io.emit("online-users", onlineUsersInfo);
    });
});
