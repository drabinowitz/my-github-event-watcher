var express = require('express');
var React = require('react');
var Router = require('react-router');
var clientRoutes = require('../public/jsx/router');
var generateIndexHtml = require('../public/generateIndexHtml');

module.exports = express.Router().get('/', function (req, res) {
  var pageHtml;
  Router.run(clientRoutes, req.url, function (Handler) {
    pageHtml = React.renderToString(React.createElement(Handler, null));
    res.send(generateIndexHtml(pageHtml));
  });
});
