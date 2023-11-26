const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE'
})

Blog.hasMany(Comment, {
    foreign_key: 'blog_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE'
})

// Comment.belongsTo(Blog, {
//     foreign_key: 'blog_id'
// })

// User.hasMany(Comment, {
//     foreign_key: 'user_id'
// })



//////////////////////////////////

// Blog.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
//   });
  
//   Blog.hasMany(Comment, {
//     foreignKey: 'blog_id',
//     onDelete: 'CASCADE'
//   });
  
//   Comment.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
//   });


module.exports = { User, Blog, Comment };