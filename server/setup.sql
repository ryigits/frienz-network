DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;

CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    first_name    TEXT NOT NULL CHECK (first_name <> ''),
    last_name     TEXT NOT NULL CHECK (last_name <> ''),
    email         TEXT NOT NULL UNIQUE CHECK (email <> ''),
    password_hash TEXT NOT NULL CHECK (password_hash <> ''),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
    id  SERIAL PRIMARY KEY,
    profilepic TEXT DEFAULT NULL,
    age INT DEFAULT NULL,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id)ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);