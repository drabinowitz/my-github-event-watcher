var React = require('react');
var Router = require('react-router');
var AppNav = require('./AppNav');
var Github = require('./Github');
var AboutMe = require('./AboutMe');
var Welcome = require('./Welcome');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  React.createElement(Route, {handler: AppNav, name: "home", path: "/"}, 
    React.createElement(DefaultRoute, {handler: Welcome}), 
    React.createElement(Route, {handler: Github, name: "github", path: "/github"}), 
    React.createElement(Route, {handler: AboutMe, name: "about-me", path: "/about-me"})
  )
);

if (typeof window !== 'undefined') {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('content'));
  });
} else {
  module.exports = routes;
}
