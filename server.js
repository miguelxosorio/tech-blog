// importing express from node library
const express = require('express');
const routes = require('./controllers');
// importing sequelize connection from the config folder
const sequelize = require('./config/connection');
const path = require('path');

// creates an express application
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// handlebars
const exhbs = require('express-handlebars');
const hbs = exhbs.create({});

app.engine('handlebars', hbs.engine);
// set up view engine
app.set('view engine', 'handlebars');

// main route
app.get('/', (req, res) => {
    res.render('main');
})

// turn on connection to db and server
// sync takes the models and connects them to associated databasse tables, if it doesn't find a table it'll create it
// force: true adds a DROP TABLE IF EXISTS before trying to create the table
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to Port ${PORT}`));
});
