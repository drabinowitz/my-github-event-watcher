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

var AppNav = React.createClass({
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
          <MenuItem key={link.url}>
            <Link to={link.url}>{link.name}</Link>
          </MenuItem>
        );
      });
      navToRender = (
        <DropdownButton title="Dropdown">
          {menuItems}
        </DropdownButton>
      );
    } else {
      navToRender = this.props.links.map(function (link) {
        return (
          <NavItem key={link.url}>
            <Link to={link.url}>{link.name}</Link>
          </NavItem>
        );
      });
    }
    return (
      <div>
        <Navbar>
          <h1>Github Event Watcher</h1>
          <Nav>
            {navToRender}
          </Nav>
        </Navbar>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = AppNav;
