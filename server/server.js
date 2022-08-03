const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const bcrypt = require("./bcrypt");
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

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
