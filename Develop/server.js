const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
// initialize our app and call in mongoose
const PORT = 3000;

const app = express();

app.use(logger("dev"));
// middleware
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// mongoose connection
mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
