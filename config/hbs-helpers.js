var dayjs = require('dayjs');

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
    },
    isExpired: function(dateString, options) {
    	if( dateString !== null && dayjs().isAfter(dayjs(dateString)) ) {
    		return options.fn(this);
    	} else {
    		return options.inverse(this);
    	}
    },
    isExpiringSoon: function(dateString, options) {
    	const e1 = dayjs(dateString).subtract(4, 'd');
    	const e2 = dayjs(dateString).add(1, 'd');

    	if( dateString !== null && dayjs().isAfter(e1) && dayjs().isBefore(e2) ) {
    		return options.fn(this);
    	} else {
    		return options.inverse(this);
    	}
    },
    isGood: function(dateString, options) {
    	if( ( dayjs().isBefore(dayjs(dateString).subtract(4, 'days')) && dayjs().isBefore(dayjs(dateString)) ) || dateString === null ) {
    		return options.fn(this);
    	} else {
    		return options.inverse(this);
    	}
    },
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