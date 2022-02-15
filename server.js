// importing express from node library
const express = require('express');
// creates an express application
const app = express();

// handlebars
const exhbs = require('express-handlebars');
const hbs = exhbs.create({});

const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
// set up view engine
app.set('view engine', 'handlebars');

// main route
app.get('/', (req, res) => {
    res.render('main');
})

// server connect
app.listen(PORT, () => console.log(`Now listening to Port ${PORT}`));