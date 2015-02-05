var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var PageHeader = ReactBootstrap.PageHeader;
var Well = ReactBootstrap.Well;

var AboutMe = React.createClass({
  render: function () {
    return (
      <div>
        <PageHeader>Thanks for taking a look at my app</PageHeader>
        <Well bsSize="large">
          Visit my <a href="https://github.com/drabinowitz">GitHub</a>
        </Well>
        <Well bsSize="large">
          Visit my <a href="https://www.linkedin.com/in/dmitrirabinowitz">LinkedIn</a>
        </Well>
        <Well bsSize="large">
          Visit my <a href="http://www.dmitrirabinowitz.com/">Website</a>
        </Well>
      </div>
    );
  }
});

module.exports = AboutMe;
