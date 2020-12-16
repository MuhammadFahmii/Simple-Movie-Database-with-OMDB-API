const express = require("express");
// const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");

// init express
const app = express();

// init Logger Middleware
app.use(logger.logger);

// Init handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Rendering template engine
app.get("/", (req, res) => {
  res.render("index", {
    title: "Movie App",
  });
});

// Handling empty favicon.ico
app.get("/favicon.ico", (req, res) => {
  res.status(204);
  res.end();

// Homepage Route
app.use("/api/omdb", require("./routes/omdb/movie"));

// set static folder
app.use(express.static("public/js"));

// init port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on Server ${PORT}`));
