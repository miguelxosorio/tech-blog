const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access user model and run .findAll() method
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        // exclude passwords to api call - protect sensitive data
        attributes: { exclude: ['password'] }, 
        where: {
            id: req.params.id
        },
        include: [
            {
            model: Post,
            attributes: ['id', 'title', 'content', 'created_at'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title']
            }
        ],
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    // Pass in key/value pairs where the keys are what we defined in the User model and the values are what we get from req.body
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        // makes sure session is created before sending response back thus wrapping the variables in a callback
        // req.session.save() will initiate the creation  of the session and then run the callback function once complete
        req.session.save(() => {
            // session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
});

// api/users/login route
router.post('/login', (req, res) => {
    // queried the user table using findOne() for the email entered by the user and assigned it to req.body.email
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'No user found with this email address!' });
            return;
        }
        // verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    // pass in req.body to provide the new data we want to use in the update and req.params.id to indicate where exactly we want that new data to be used
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;