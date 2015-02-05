var assign = require('object-assign');
var EventEmitter = require('eventemitter').EventEmitter;
var $ = require('jquery');

var eventsData = [];

var EventsStore = assign({}, EventEmitter.prototype, {
  _githubEvents: eventsData,

  preloadData: function (data) {
    this._githubEvents = data;
  },

  getNewestEventTimestamp: function () {
    if (this._githubEvents) {
      return this._githubEvents[this._githubEvents.length - 1].created_at;
    }
  },

  emitChange: function () {
    this.emit('CHANGE');
  },

  addChangeListener: function (callback) {
    this.addListener('CHANGE', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('CHANGE', callback);
  },

  getAll: function () {
    return this._githubEvents;
  },

  get: function (events) {
    this._githubEvents = this._githubEvents.concat(events);
    this.emitChange();
  }
});

if (typeof window !== 'undefined') {
  setInterval(function () {
    var request = {
      url:'/api',
      type: 'GET',
      success: function (result) {
        EventsStore.get(result);
      }
    };
    var newestEventTimestamp = EventsStore.getNewestEventTimestamp();
    if (newestEventTimestamp) {
      request.data = {
        newestEventTimestamp: newestEventTimestamp
      };
    }
    $.ajax(request);
  }, 10000);
  if (window.__preloadedData && window.__preloadedData.events) {
    EventsStore.preloadData(window.__preloadedData.events);
  }
}

module.exports = EventsStore;
