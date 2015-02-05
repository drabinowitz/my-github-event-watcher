#GitHub Event Watcher

This Application is a Full-Stack Isomorphic App

##Stack

Front-end: Browserify, Envify, Reactify, React, Flux, React-Router, React-Bootstrap, React-D3, Moment, Underscore, jQuery

Back-end: Node, Express, Moment, CronJob, Http-Request, GitHub API, MySQL, Bookshelf, Knex

##How it Works

###Backend

The app uses a once-per-minute CronJob to query the GitHub API for new events from my user, passing in an etag to see if there have been any new events.

If there have been any updates it recursively requests pages of events from GitHub until it finds a page with an event id lower than the last event id in the database

because of GitHub event ordering this means that the event is older, and thus this page contains the latest event in the database and no further pages should be requested.

At that point it splices off all of the new events from that page and pushes them into the MySQL database.

###Frontend

This is an isomorphic app built on React and Flux. That means that, when you submit an initial http request to the app it renders the page with React and then serves it prerendered with data

In addition, it will preload the GitHub events store with data so that the store will be aware of the preloaded data on the client side.

The initial page loads fully rendered with all the data and then requests the associated bundled JS file (bundle is built with Browserify, Envify, and Reactify)

Once the bundled JS file arrives the React scripts hook into the prerendered DOM and add the event listeners that allow the app to be responsive in the following ways:

1. Client side routing via React-Router (you only ever make one html request to the server, after that it is all client-side routing)
2. Continuous polling for new events. Once the store loads up and grabs its preloaded data it submits continuous requests to the server to capture new events that are stored in the database

In terms of the DOM rendering we are using React-Bootstrap for a responsive beautiful table and React-D3 for our bar chart
