const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// dashboard
router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

// edit post route
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
            post,
            loggedIn: true
        })

    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

// new post
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
