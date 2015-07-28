'use strict';
var connect = require('connect');
var logger = require('morgan');
var serve = require('serve-static');
var tinylr = require('tiny-lr-fork');
var livereload = require('connect-livereload');

var lrOpts = {
  port: 35729,
  liveCSS: true,
  liveImg: true
}

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

  // Serve htmls for oauth flow callbacks
  app.use(serve(__dirname + '/../assets', { 'index': false }));

  if(opts.livereload) {
    tinylr(lrOpts).listen(opts.livereloadPort, function() {
      console.log('LiveReload listening on port', opts.livereloadPort);
    });
    app.use(livereload({ port: opts.livereloadPort }));
  }

  app.use(serve(dir));
  return app;
}

module.exports = middleware;
