const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// get all
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // check the session
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            // use the id from the session
            post_id: req.body.post_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.error(err);
            res.status(400).json(err);
        });
    }
});

router.put('/:id', (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' })
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' })
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;