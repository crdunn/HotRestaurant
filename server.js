// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var tables = [ [ ], [ ], [ ] ];
// Routes
// =============================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/api/new", function(req, res) {
      return res.json(tables);
});
// Create a new reservation
// =============================================================
app.post("/api/new", function(req, res) {
    var newReservation = req.body;
  // newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    tables[2].push(newReservation);
    if(tables[2].length <= 5) {
        tables[0].push(newReservation);
    }
    else if(tables[2].length > 5) {
        tables[1].push(newReservation);
    }
    res.json(newReservation);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
