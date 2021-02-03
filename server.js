var express = require("express");
var exphbs = require("express-handlebars");
const session = require('express-session');

const PORT = process.env.PORT || 8080;

const app = express();

// Access sequelize database
const db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var hbsHelpers = exphbs.create({
  helpers: require('./config/hbs-helpers.js').helpers,
  defaultLayout: 'main',
  extname: 'hbs'
});

// Sets up sessions for user login
app.use(session({
  secret: 'What does despensa mean? ',
  resave: false,
  saveUninitialied: false,
  cookies: {
    maxAge: 1000 * 60 * 60 * 2
  }
}));

app.engine("hbs", hbsHelpers.engine);
app.set("view engine", "hbs");

const userRoutes = require("./controllers/usersController.js");
const containersRoutes = require("./controllers/containersController.js");
const foodsRoutes = require("./controllers/foodsController.js");
const locationRoutes = require("./controllers/locationController.js");
const themeRoutes = require("./controllers/themeController.js");

app.use(userRoutes);
app.use(containersRoutes);
app.use(foodsRoutes);
app.use(locationRoutes);
app.use(themeRoutes);

// Start our server so that it can begin listening to client requests.
// 'force: true' drops the database/tables and recreates everything
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});



