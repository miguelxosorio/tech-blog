// importing express from node library
const express = require('express');
const routes = require('./controllers');
// importing sequelize connection from the config folder
const sequelize = require('./config/connection');

// creates an express application
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to Port ${PORT}`));
});
