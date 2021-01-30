var express = require("express");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;

var app = express();

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

app.engine("hbs", hbsHelpers.engine);
app.set("view engine", "hbs");

// Import routes and give the server access to them.
var routes = require("./controllers/usersController.js");

app.use(routes);

app.get("/", (req, res) => {
	res.render("index", {});
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
