const express = require("express"); // access
const socket = require("socket.io"); // access

const app = express(); // initialize & server ready

app.use(express.static("public")); // connect to the frontend | index.html

// let port = 5000;
let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log("Listening to port" + port); // terminal - node app.js
});

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Made socket connection");

    // BEGIN PATH
    socket.on("beginPath", (data) => { // received data | data - data from frontend
        // transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    });

    // DRAW STROKE
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    });

    // REDO UNDO
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    });
});