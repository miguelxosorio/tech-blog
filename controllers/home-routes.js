const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
    // if(req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('login');
})

router.get('/post/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No  post found with this id' });
            return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });

        // pass data to template
        res.render('single-post', { post });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;