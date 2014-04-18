'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    passport = require('passport')
/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/hello.txt', function(req, res){
    res.send('Hello World');
  });

    // Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
   app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
   app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { successRedirect: '/',
            failureRedirect: '/login' }));

  app.get('/partials/*', index.partials);

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

  app.get('/index2', index.index2);
  app.get('/index2/:id', index.index2);
  app.get('/index3', index.index3);
  app.get('/', index.index);


};