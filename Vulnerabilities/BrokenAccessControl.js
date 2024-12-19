const express = require("express");
const app = express();

app.get("/admin", (req, res) => {
    const role = req.query.role; // Role passed via query parameter
    if (role === "admin") {
        res.send("Welcome to the admin panel!");
    } else {
        res.status(403).send("Access Denied!");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
