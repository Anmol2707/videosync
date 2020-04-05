const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const http = require('http');
const server = http.Server(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
const socketIO = require('socket.io');
const io = socketIO(server);

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/tutorial.routes")(app);

// set port, listen for requests


io.on("connection", function(socket) {
  io.emit('user connected');
  socket.on('message', function(msg) {
    io.emit("message", msg);
  });
 });

