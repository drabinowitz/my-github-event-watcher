var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PageHeader = ReactBootstrap.PageHeader;
var Well = ReactBootstrap.Well;

var AboutMe = React.createClass({displayName: "AboutMe",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(PageHeader, null, "Thanks for taking a look at my app"), 
        React.createElement(Well, {bsSize: "large"}, 
          "Visit my ", React.createElement("a", {href: "https://github.com/drabinowitz"}, "GitHub")
        ), 
        React.createElement(Well, {bsSize: "large"}, 
          "Visit my ", React.createElement("a", {href: "https://www.linkedin.com/in/dmitrirabinowitz"}, "LinkedIn")
        ), 
        React.createElement(Well, {bsSize: "large"}, 
          "Visit my ", React.createElement("a", {href: "http://www.dmitrirabinowitz.com/"}, "Website")
        )
      )
    );
  }
});

module.exports = AboutMe;
