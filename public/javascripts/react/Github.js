var React = require('react');
var ReactBootstrap  = require('react-bootstrap');
var ReactD3 = require('react-d3');
var BarChart = ReactD3.BarChart;
var Table = ReactBootstrap.Table;
var EventsStore = require('../stores/EventsStore');
var _ = require('underscore');
var moment = require('moment');

var Github = React.createClass({displayName: "Github",
  getInitialState: function () {
    return {
      events: EventsStore.getAll(),
      loading: true
    };
  },

  listenerCallback: function () {
    if (this.isMounted()) {
      this.setState({
        events: EventsStore.getAll()
      });
    }
  },

  componentDidMount: function () {
    this.setState({loading: false});
    EventsStore.addChangeListener(this.listenerCallback);
  },

  componentWillUnmount: function () {
    EventsStore.removeChangeListener(this.listenerCallback);
  },

  render: function () {
    var tableHeader = (
      React.createElement("tr", null, 
        React.createElement("th", null, "Github Id"), 
        React.createElement("th", null, "Event Type"), 
        React.createElement("th", null, "Created At")
      )
    );
    var tableData = this.state.events.map(function (event) {
      return (
        React.createElement("tr", {key: event.github_id}, 
          React.createElement("td", null, event.github_id), 
          React.createElement("td", null, event.type), 
          React.createElement("td", null, moment(event.created_at).toISOString())
        )
      );
    }).reverse();

    var chart;
    var eventData = _.groupBy(this.state.events, 'type');
    var chartData = [];
    var eventType;
    for (eventType in eventData) {
      chartData.push({label: eventType, value: eventData[eventType].length})
    }

    chart = (
      React.createElement(BarChart, {
        data: chartData, 
        width: 700, 
        height: 600, 
        fill: '#3182bd', 
        title: "Github Event Data"})
    );

    return (
      React.createElement("div", null, 
        chart, 
        React.createElement(Table, {striped: true, bordered: true, hover: true, responsive: true}, 
          React.createElement("thead", null, 
            tableHeader
          ), 
          React.createElement("tbody", null, 
            tableData
          )
        )
      )
    );
  }
});

module.exports = Github;
