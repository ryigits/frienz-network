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
    return db.query(
        `
        INSERT INTO users(first_name,last_name,email,password_hash)
        VALUES ($1,$2,$3,$4)  RETURNING id,first_name`,
        [first_name, last_name, email, password]
    );
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
    return db.query(`;`, [id]);
};

module.exports.addProfilePic = (id, url) => {
    return db.query(`UPDATE users SET profilepic=$2 WHERE id=$1;`, [id, url]);
};

module.exports.getUserById = (id) => {
    return db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
};

module.exports.updateBio = (id, bio) => {
    return db.query(`UPDATE users SET bio=$2 WHERE id=$1;`, [id, bio]);
};

module.exports.getRecentUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 4;`);
};

module.exports.getSearchUsers = (first_name) => {
    return db.query(`SELECT * FROM users WHERE first_name ILIKE $1 LIMIT 4;`, [
        first_name + "%",
    ]);
};

module.exports.getUserById = (id) => {
    return db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
};

module.exports.addCloseFriend = (sender_id, receiver_id) => {
    return db.query(
        `INSERT INTO closefriends (sender_id,receiver_id) VALUES ($1,$2) RETURNING *`,
        [sender_id, receiver_id]
    );
};

module.exports.findCloseFriends = (user1, user2) => {
    const query = `
        SELECT * FROM closefriends
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)`;
    return db.query(query, [user1, user2]);
};

module.exports.removeCloseFriend = (sender_id, receiver_id) => {
    const query = `
        DELETE FROM closefriends WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1) RETURNING *;
        `;
    return db.query(query, [sender_id, receiver_id]);
};

module.exports.acceptCloseFriend = (sender_id, receiver_id) => {
    const query = `
        UPDATE closefriends SET arefriend=TRUE,accepted=TRUE 
        WHERE sender_id=$1 
        AND receiver_id=$2
        RETURNING *;
        `;
    return db.query(query, [sender_id, receiver_id]);
};

module.exports.getAllCloseFriendsAndWannabes = (id) => {
    const query = `
        SELECT users.id, first_name, last_name, closefriends.arefriend,closefriends.accepted, profilepic FROM users
JOIN closefriends
ON (arefriend = true AND receiver_id = $1 AND users.id = closefriends.sender_id)
OR (arefriend = true AND sender_id = $1 AND users.id = closefriends.receiver_id)
OR (arefriend = false AND receiver_id = $1 AND users.id = closefriends.sender_id)`;
    return db.query(query, [id]);
};

module.exports.getRecentMessages = () => {
    return db.query(`SELECT * FROM chatboard ORDER BY id DESC;`, []);
};

module.exports.addNewMessages = (id, first_name, profilepic, text) => {
    return db.query(
        `INSERT INTO chatboard(sender_id,first_name,profilepic,text) VALUES ($1,$2,$3,$4) RETURNING *;`,
        [id, first_name, profilepic, text]
    );
};