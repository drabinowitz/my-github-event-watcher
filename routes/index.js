var express = require('express');
var React = require('react');
var Router = require('react-router');
var ClientRoutes = require('../public/javascripts/react/Router');
var generateIndexHtml = require('../public/generateIndexHtml');
var EventsPreloader = require('../preloaders/EventsPreloader');

var defaultResponse = function (req, res) {
  var pageHtml;
  EventsPreloader().then(function (dataToAttach) {
    Router.run(ClientRoutes, req.url, function (Handler) {
      pageHtml = React.renderToString(React.createElement(Handler, null));
      res.send(generateIndexHtml(pageHtml, dataToAttach));
    });
  });
};

module.exports = express.Router()
.get('/', defaultResponse)
.get('/github', defaultResponse)
.get('/about-me', defaultResponse);
