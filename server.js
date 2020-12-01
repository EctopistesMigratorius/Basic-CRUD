// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

// server port
var HTTP_PORT = 8000
    // Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

// Insert here other API endpoints
app.get("/api/users", (req, res, next) => {
    const sql = "SELECT * FROM user INNER JOIN role ON user.idRole=role.idRole;"
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({"users": rows});
    });
});

app.get("/api/user/:id", (req, res, next) => {
    const sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({"user": row});
    });
});


// Default response for any other request
app.use(function(req, res) {
    res.status(404);
});