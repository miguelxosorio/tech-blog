const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'He went wild???',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'No, Not you too!',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'Wohoooooo!',
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;