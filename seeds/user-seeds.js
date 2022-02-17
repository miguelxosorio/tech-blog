const { User } = require('../models');

const userData = [
    {
        username: 'Mario',
        email: 'mario@gmail.com',
        password: 'mario'
    },
    {
        username: 'Luigi',
        email: 'luigi@gmail.com',
        password: 'luigi'
    },
    {
        username: 'Peach',
        email: 'peach@gmail.com',
        password: 'peach'
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;