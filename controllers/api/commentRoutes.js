const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:id', withAuth, async (req, res) => {
    console.log('req.body: ', req.body.description);
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            blog_id: req.params.id
        });
        console.log(newComment);
        res.redirect(`/blogs/${req.params.id}`);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        console.log('```````````````````````````````', commentData);
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    };
});

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


module.exports = router;