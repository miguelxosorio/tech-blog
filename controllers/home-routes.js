const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // The data that Sequelize returns is actually a Sequelize object with a lot more information attached to it than you might have been expecting.
        // To serialize the object down to only the properties you need, you can use Sequelize's get() method
        // need the entire array of posts to be in the template, need to serialize entire array
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;