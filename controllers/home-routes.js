const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
   Post.findAll({
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
        // This will loop over and map each Sequelize object into a serialized version of itself, saving the results in a new posts array
       const posts = dbPostData.map(post => post.get({ plain: true }));
       // pass post to object into the homepage template
       // use this with the #each helper in the homepage.handlebars to render the posts
       // in the homepage any HTML code between the <li> will be repeated for every item in posts
       res.render('homepage', { posts });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login')
});

module.exports = router;