const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all users
router.get('/', async (req, res) => {
    try {
        // Get ALL Blogs and join with User data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Pass seralized data and session flag into template
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => { 
    let title = 'Dashboard'
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }]
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true,
            title
        });

    } catch (err) {
        res.status(500).json(err);
    };
});

// Get comments route
router.get('/comments', async (req, res) => {
    try {
        // Get ALL Blogs and join with User data
        const commentData = await Comment.findAll();


        // Pass seralized data and session flag into template
        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Find one blog and include the User and Comment model
router.get('/blogs/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },  
                {
                    model: Comment,
                    include: {
                    model: User,
                    attributes: ['username']
                    }
                }
            ]
        });

        // Serialize incoming data so the template can read it
        const blog = blogData.get({ plain: true });
        console.log('blog: ', blog);

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    };
});

// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {

    res.render('signup');
});

module.exports = router;