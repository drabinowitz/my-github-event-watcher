var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;

var AppNav = React.createClass({displayName: "AppNav",
  getInitialState: function () {
    return {
      displayingForMobile: true
    };
  },

  getDefaultProps: function () {
    return {
      links: [
        {
          url: '/',
          name: 'Home'
        },
        {
          url: '/github',
          name: 'GitHub Events'
        },
        {
          url: '/about-me',
          name: 'About Me'
        }
      ]
    };
  },

  componentDidMount: function () {
    var mq = window.matchMedia("(min-width: 600px)");
    if (mq.matches) {
      this.setState({displayingForMobile: false});
    }
  },

  render: function () {
    var navToRender, menuItems;
    if (this.state.displayingForMobile) {
      menuItems = this.props.links.map(function (link) {
        return (
          React.createElement(MenuItem, {key: link.url}, 
            React.createElement(Link, {to: link.url}, link.name)
          )
        );
      });
      navToRender = (
        React.createElement(DropdownButton, {title: "Dropdown"}, 
          menuItems
        )
      );
    } else {
      navToRender = this.props.links.map(function (link) {
        return (
          React.createElement(NavItem, {key: link.url}, 
            React.createElement(Link, {to: link.url}, link.name)
          )
        );
      });
    }
    return (
      React.createElement("div", null, 
        React.createElement(Navbar, null, 
          React.createElement("h1", null, "Github Event Watcher"), 
          React.createElement(Nav, null, 
            navToRender
          )
        ), 
        React.createElement(RouteHandler, null)
      )
    );
  }
});

module.exports = AppNav;
