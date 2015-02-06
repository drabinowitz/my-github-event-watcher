var Bookshelf = require('bookshelf');

var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: process.env.RDS_HOSTNAME || '',
    user: process.env.RDS_USERNAME || '',
    password: process.env.RDS_PASSWORD || '',
    port: process.env.RDS_PORT || '',
    database: 'github_events',
    charset: 'utf8'
  }
});

db.knex.schema.hasTable('events')
.then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('events', function (event) {
      event.increments('id').primary();
      event.biginteger('github_id');
      event.string('type', 255);
      event.timestamps();
    })
    .then(function (table) {
      console.log('Created Table', table);
      require('../workers/githubFetcher')();
    });
  }
});

module.exports = db;
