const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreign_key: 'user_id'
})

Blog.hasMany(Comment, {
    foreign_key: 'blog_id',
})

Comment.belongsTo(Blog, {
    foreign_key: 'blog_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Blog, Comment};