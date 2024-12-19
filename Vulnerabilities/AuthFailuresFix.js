const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Fake user database
const users = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user", password: "user123", role: "user" },
];

const SECRET_KEY = process.env.JWT_SECRET || "default_very_strong_secret";

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
        { username: user.username, role: user.role },
        SECRET_KEY,
        { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.json({ token });
});


app.get("/admin", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Token required");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        // Fetch the user from the database
        const user = users.find((u) => u.username === decoded.username);

        if (!user || user.role !== "admin") {
            return res.status(403).send("Access denied");
        }

        res.send("Welcome to the admin panel!");
    } catch (err) {
        res.status(401).send("Invalid token");
    }
});

app.listen(3000, () => console.log("Auth Failures server running on port 3000"));
