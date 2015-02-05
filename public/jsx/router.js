var React = require('react');
var Router = require('react-router');
var AppNav = require('./AppNav');
var Welcome = require('./Welcome');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route handler={AppNav} path='/'>
    <DefaultRoute handler={Welcome} />
  </Route>
);

if (typeof window !== 'undefined') {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.getElementById('content'));
  });
} else {
  module.exports = routes;
}
