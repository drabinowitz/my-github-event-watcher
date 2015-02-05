var express = require('express');
var Event = require('../db/event.model');
var moment = require('moment');

module.exports = express.Router().get('/', function (req, res) {
  new Event().query(function (qb) {
    qb.where('updated_at', '>', moment().subtract(1, 'days').toISOString());
  }).fetchAll().then(function (collection) {
    res.json(collection);
  });
});
