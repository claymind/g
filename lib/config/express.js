'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config');

var passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy;

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/app/views');
  });


  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({secret: 'supercalifragelisticexpialidocious'}));
    app.use(passport.initialize());
    app.use(passport.session());


      passport.use(new TwitterStrategy({
              consumerKey: 'nbkysaP3Qxk0DbeXX5NKw',
              consumerSecret: 'aGZ2bYKpC8YHvmxhE23Ciz57KXITSpa9vdxZ8E65E',
              callbackURL: '/auth/twitter/callback'
          },
          function(token, tokenSecret, profile, done) {
              //console.log('im here');
              var p = profile;
              console.info(profile);

//              User.findOrCreate(..., function(err, user) {
//                  if (err) { return done(err); }
//                  done(null, user);
//              });
              var user = {
                  name: "G3 Misa",
                  email: "g3misa@yahoo.com",
                  id: "g3misa",
                  provider: 'twitter'
              };

              done(null, user);
          }
      ));

      passport.serializeUser(function(user, done) {
          done(null, user.id);
      });

      passport.deserializeUser(function(id, done) {
//          User.findById(id, function(err, user) {
//              done(err, user);
//          });

          var user = {
              name: "G3 Misa",
              email: "g3misa@yahoo.com",
              id: "g3misa",
              provider: 'twitter'
          };

          done(null, user);
      });

    // Router needs to be last
    app.use(app.router);
  });
};