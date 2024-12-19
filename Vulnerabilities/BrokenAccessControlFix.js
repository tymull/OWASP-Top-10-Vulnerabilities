app.get("/admin", (req, res) => {
    const user = req.user; // Assume a middleware has populated this
    if (user && user.role === "admin") {
        res.send("Welcome to the admin panel!");
    } else {
        res.status(403).send("Access Denied!");
    }
});