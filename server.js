// Importing express from node library
const express = require('express');
// path module works with directories and file paths
const path = require('path');
// Importing dotenv dependency to use process.env for sensitive information
require('dotenv').config();
// allows us to connect to the backend
const session = require('express-session');
// handlebars
const exhbs = require('express-handlebars');
// import helpers
const helpers = require('./utils/helpers');

// creates an express application
const app = express();
const PORT = process.env.PORT || 3001; // dynamic port
const routes = require('./controllers'); // storing the routes from controllers into routes var

// importing sequelize connection from the config folder
const sequelize = require('./config/connection');
// stores sessions created by express-session into the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// this sets up an express.js session and connects the session to the sequelize db
const sess = {
    secret: process.env.SECRET_ID, // session cookie ID
    cookie: {
        expires: 60 * 60 * 1000 // expires in 1 hr
    },
    resave: false, // wont force the session to be saved back to session store without modifications
    saveUninitialized: true, // Force uninitialized sessions to be saved to the store. A session is uninitialized when it is new but not modified
    store: new SequelizeStore({
        db: sequelize
    })
};

// allow express to use session
app.use(session(sess));
// create helpers - pass in 
const hbs = exhbs.create({ helpers });

app.engine('handlebars', hbs.engine);
// set up view engine
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, 'public'))); // takes the content of the public folder to make them available as static files

// turn on routes - routes are packaged in the controller folder
app.use(routes);

// turn on connection to db and server
// sync takes the models and connects them to associated databasse tables, if it doesn't find a table it'll create it
// force: true adds a DROP TABLE IF EXISTS before trying to create the table
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to Port ${PORT}`));
});
