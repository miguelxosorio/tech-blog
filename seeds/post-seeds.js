const { Post } = require('../models');

const postData = [
    {
        title: 'Mario Goes Wild',
        content: 'Mario Mario Mario goes goes goes wild wild wild with shrooms',
        user_id: 1
    },
    {
        title: 'Luigi Goes Ham',
        content: 'Luigi Luigi Luigi goes goes goes ham ham ham with a star',
        user_id: 2
    },
    {
        title: 'Peach is Rescued',
        content: 'Peach Peach Peach is is is rescued rescued rescued by Mario and Luigi',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;