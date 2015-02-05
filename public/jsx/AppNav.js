var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var NavBar = ReactBootstrap.NavBar;
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
          name: 'Github Events'
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
        return <MenuItem href={link.url}>{link.name}</MenuItem>
      });
      navToRender = (
        <DropdownButton title="Dropdown">
          {menuItems}
        </DropdownButton>
      );
    } else {
      navToRender = this.props.links.map(function (link) {
        return <NavItem href={link.url}>{link.name}</NavItem>
      });
    }
    return (
      <NavBar>
        {navToRender}
      </NavBar>
    );
  }
});

module.exports = AppNav;
