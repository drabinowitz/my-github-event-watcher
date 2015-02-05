var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PageHeader = ReactBootstrap.PageHeader;

var Welcome = React.createClass({
  render: function () {
    return (
      <PageHeader>Hi There this is an app displaying my github events over the last 24 hours! Check it out in the GitHub Events tab in the nav bar.</PageHeader>
    );
  }
});

module.exports = Welcome;
