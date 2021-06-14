const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const transition = require("./route/transation.js");
const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

if (process.env.NODE_ENV) {
	app.use(morgan("dev"));
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("database connect....");
});

app.use("/api/transactions", transition);
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`server is started on port ${port}...`);
});
