var React = require('react');
var Router = require('react-router');
var AppNav = require('./AppNav');
var Github = require('./Github');
var AboutMe = require('./AboutMe');
var Welcome = require('./Welcome');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route handler={AppNav} path='/'>
    <DefaultRoute handler={Welcome} />
    <Route handler={Github} path='/github/'>
    <Route handler={AboutMe} path='/about-me/'>
  </Route>
);

if (typeof window !== 'undefined') {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.getElementById('content'));
  });
} else {
  module.exports = routes;
}
