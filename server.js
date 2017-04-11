"use strict";

let http = require("http"),
	express = require("express"),
	socketIo = require("socket.io");

const app = express();
app.set("view engine", "jade");

app.get("/", (request, response) => {
	response.end("Hello, World");
});

app.use(express.static("./public"));

app.get("/home", (request,response) => {
	response.render("index", {title: "TITLE!"});
});


const server = new http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
	console.log("Client connected!");
	socket.on("chat:add", data => {
		console.log(data);
		io.emit("chat:added", data);
	});

	socket.on("disconnect", () => {
		console.log("Socket disconnected");
	});
});

const port = 3000;
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});




