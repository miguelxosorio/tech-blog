const User = require('./User');
const Post = require('./Post');

// associations
// a post can belong to ONE user, but not many users
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
})

module.exports = { User, Post };