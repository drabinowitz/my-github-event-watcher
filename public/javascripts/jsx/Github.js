var React = require('react');
var ReactBootstrap  = require('react-bootstrap');
var ReactD3 = require('react-d3');
var ScatterChart = ReactD3.ScatterChart;
var Table = ReactBootstrap.Table;
var EventsStore = require('../stores/EventsStore');
var _ = require('underscore');
var moment = require('moment');

var Github = React.createClass({
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
      <tr>
        <th>Github Id</th>
        <th>Event Type</th>
        <th>Created At</th>
      </tr>
    );
    var tableData = this.state.events.map(function (event) {
      return (
        <tr key={event.github_id}>
          <td>{event.github_id}</td>
          <td>{event.type}</td>
          <td>{event.created_at}</td>
        </tr>
      );
    }).reverse();

    var chart;
    if (!this.state.loading) {
      var eventData = _.groupBy(this.state.events, 'type');
      var chartData = {};
      var eventType;
      for (eventType in eventData) {
        chartData[eventType] = eventData[eventType].map(function (event) {
          return {
            x: 24 - moment.duration(moment()-moment(event.created_at)).asHours(),
            y: event.id
          };
        });
      }

      chart = (
        <ScatterChart
          data={chartData}
          width={700}
          height={600}
          title="Event Data" />
      );
    }

    return (
      <div>
        {chart}
        <Table responsive>
          <thead>
            {tableHeader}
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </Table>
      </div>
    );
  }
});

module.exports = Github;
