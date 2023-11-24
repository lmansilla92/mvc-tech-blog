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

module.exports = router;