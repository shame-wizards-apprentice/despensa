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
  saveUninitialied: true,
  cookies: {
    maxAge: 1000 * 60 * 60 * 2
  }
}));

app.engine("hbs", hbsHelpers.engine);
app.set("view engine", "hbs");

const adviceRoutes = require("./controllers/adviceController");
const containerRoutes = require("./controllers/containersController");
const foodsRoutes = require("./controllers/foodsController");
const locationRoutes = require("./controllers/locationController");
const userRoutes = require("./controllers/usersController");
const themeRoutes = require("./controllers/themeController");

app.use(adviceRoutes);
app.use(containerRoutes);
app.use(foodsRoutes);
app.use(locationRoutes);
app.use(userRoutes);
app.use(themeRoutes);


// Start our server so that it can begin listening to client requests.
// 'force: true' drops the database/tables and recreates everything
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});



