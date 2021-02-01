// https://stackoverflow.com/a/42224612
var register = function(Handlebars) {
  var helpers = {
    //https://gist.github.com/niksumeiko/6777429
    // Compares first value to the second one allowing entering IF clouse if true.
    // Otherwise entering ELSE clause if exist.
    ifEquals: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);