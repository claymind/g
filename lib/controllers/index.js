'use strict';

var path = require('path');
var passport = require('passport')

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

exports.lifetime = function(req, res) {
    res.render('lifetime', {'name' : 'Sharmila'});
};


/**
 * Send our single page app
 */
exports.index = function(req, res) {
    
  res.render('index', {'name' : 'Guillermo'});
};

