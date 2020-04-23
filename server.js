const express = require("express");
var compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

const db = require("./models");
app.use(compression());

// app.use(express.static("public"));
app.use(express.static("dist"));


// if (process.env.JAWSDB_URL) {
//   console.log("successfully connected");
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "Myvsgspwd787",
//     database: "pokemon_DB",
//   });
// }

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes from the routes folder
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});
