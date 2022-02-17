// importing express from node library
const express = require('express');
const path = require('path');
// allows us to connect to the backend
const session = require('express-session');
// handlebars
const exhbs = require('express-handlebars');

// creates an express application
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./controllers');

// importing sequelize connection from the config folder
const sequelize = require('./config/connection');
// stores sessions created by express-session into the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// this sets up an express.js session and connects the session to the sequelize db
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
const hbs = exhbs.create({});

app.engine('handlebars', hbs.engine);
// set up view engine
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// main route
// app.get('/', (req, res) => {
//     res.render('main');
// })

// turn on connection to db and server
// sync takes the models and connects them to associated databasse tables, if it doesn't find a table it'll create it
// force: true adds a DROP TABLE IF EXISTS before trying to create the table
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to Port ${PORT}`));
});
