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
                `INSERT INTO profiles(profilepic,bio,age,user_id) VALUES (DEFAULT,DEFAULT,DEFAULT,$1) RETURNING  user_id`,
                [id]
            );
        });
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

module.exports.changePasswordByEmail = (email, newPassword_hash) => {
    return db.query(
        `
        UPDATE users SET password_hash=$2 WHERE email=$1`,
        [email, newPassword_hash]
    );
};

module.exports.addCodeIntoDb = (email, code) => {
    return db.query(
        `
        INSERT INTO reset_codes(email,code)
        VALUES ($1,$2)`,
        [email, code]
    );
};

module.exports.getCodesFromDb = () => {
    return db.query(
        `
        SELECT * FROM reset_codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        `
    );
};

module.exports.getProfileById = (id) => {
    return db.query(`SELECT * FROM profiles WHERE user_id=$1;`, [id]);
};

module.exports.addProfilePic = (id, url) => {
    return db.query(`UPDATE profiles SET profilepic=$2 WHERE user_id=$1;`, [
        id,
        url,
    ]);
};

module.exports.getUserById = (id) => {
    return db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
};

module.exports.updateBio = (id, bio) => {
    return db.query(`UPDATE profiles SET bio=$2 WHERE user_id=$1;`, [
        id,
        bio,
    ]);
};

module.exports.getRecentUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 4;`);
};

module.exports.getSearchUsers = (first_name) => {
    return db.query(`SELECT * FROM users WHERE first_name ILIKE $1;`,[first_name+'%']);
};


