'use strict';
var connect = require('connect');
var logger = require('morgan');
var serve = require('serve-static');
var tinylr = require('tiny-lr');
var livereload = require('connect-livereload');

function cordovaMiddleware(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.end('(function(){})();');
}

function middleware(dir, opts) {
  var app = connect();

  if(opts.log) {
    app.use(logger(opts.logFormat));
  }

  if(opts.cordova) {
    app.use('/cordova.js', cordovaMiddleware);
  }

  if(opts.livereload) {
    tinylr().listen(opts.livereloadPort, function() {
      console.log('LiveReload listening on port', opts.livereloadPort);
    });
    app.use(livereload({ port: opts.livereloadPort }));
  }

  app.use(serve(dir));
  return app;
}

module.exports = middleware;
