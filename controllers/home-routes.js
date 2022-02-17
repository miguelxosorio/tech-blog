const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        content: "1 M views",
        title: "Wow 1 million views",
        created_at: new Date(),
        comments: [{}, {}],
        user: {
            username: 'test_user'
        }
    });
});

module.exports = router;