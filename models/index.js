const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreign_key: 'user_id'
})

module.exports = { User, Blog };