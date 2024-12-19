const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const db = new sqlite3.Database(":memory:"); // In-memory SQLite database

// Create a sample users table
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
    db.run("INSERT INTO users (name) VALUES ('Zelda')");
    db.run("INSERT INTO users (name) VALUES ('Link')");
});

app.get("/search", (req, res) => {
    const query = req.query.name;
    const sql = `SELECT * FROM users WHERE name LIKE '${query}'`; // Using LIKE to widen the matching scope
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send("Error!");
        } else {
            res.json(rows);
        }
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));