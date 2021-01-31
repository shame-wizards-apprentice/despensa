const express = require("express");
const session = require ('express-session');
const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up sessions for user login
app.use(session({
  secret: 'What does despensa mean? ',
  resave: false,
  saveUninitialied: true,
  cookies: {
    maxAge: 1000*60*60*2
  }
}));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Access sequelize database
const db = require("./models");

// Import routes and give the server access to them.
const userRoutes = require("./controllers/usersController.js");

app.use(userRoutes);

// Start our server so that it can begin listening to client requests.
// 'force: true' drops the database/tables and recreates everything
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});



