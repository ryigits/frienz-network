let databaseUrl;
if (process.env.NODE_ENV === "production") {
    databaseUrl = process.env.DATABASE_URL;
} else {
    const {
        DB_USER,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_NAME,
    } = require("./secrets.json");
    databaseUrl = `postgres:${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}
const spicedPg = require("spiced-pg");
const db = spicedPg(databaseUrl);

const bcrypt = require("./bcrypt");

module.exports.addUser = (first_name, last_name, email, password) => {
    return db
        .query(
            `
        INSERT INTO users(first_name,last_name,email,password_hash)
        VALUES ($1,$2,$3,$4)  RETURNING id,first_name`,
            [first_name, last_name, email, password]
        )
        .then((returning) => {
            let id = returning.rows[0].id;
            return db.query(
                `INSERT INTO profiles(city,age,user_id) VALUES (DEFAULT,DEFAULT,$1) RETURNING  user_id`,
                [id]
            );
        });
};

module.exports.getAllUsers = () => {
    return db.query(`SELECT users.first_name,users.last_name,profiles.city,profiles.age
FROM users LEFT OUTER JOIN profiles ON users.id=profiles.user_id;`);
};

module.exports.getUserByEmail = (email) => {
    return db
        .query(
            `
        SELECT * FROM users WHERE email=$1`,
            [email]
        )
        .then((result) => {
            return result.rows[0];
        });
};

module.exports.authUser = (email, password) => {
    return db
        .query(
            `
        SELECT * FROM users WHERE email=$1`,
            [email]
        )
        .then((user) => {
            return bcrypt.compare(password, user.rows[0].password_hash);
        })
        .catch(() => false);
};

module.exports.deleteUser = (id) => {
    return db.query(
        `
        DELETE FROM users WHERE id=$1`,
        [id]
    );
};

module.exports.changePassword = (id, newPassword_hash) => {
    return db.query(
        `
        UPDATE users SET password_hash=$2 WHERE id=$1`,
        [id, newPassword_hash]
    );
};
