const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

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