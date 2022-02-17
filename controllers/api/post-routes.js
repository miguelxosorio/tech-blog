const router = require('express').Router();
const { Post, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      // Query configuration
      attributes: [
        'id',  
        'title',
        'content',
        'created_at'
      ]
    })
  
});