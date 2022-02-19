const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'user_id', 'content'],
        include: {
            model: Post,
            attributes: ['id', 'title', 'user_id', 'content', 'created_at']
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.error(err);
        res.status(404).json(err);
    })
})

module.exports = router;
