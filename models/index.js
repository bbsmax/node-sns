const Sequalize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequalize(
  config.database, config.username, config.password, config,
)

db.sequelize = sequelize;
db.Sequalize = Sequalize;

db.User = require('./user')(sequelize, Sequalize);
db.Post = require('./post')(sequelize, Sequalize);
db.HashTag = require('./hashtag')(sequelize, Sequalize);

db.User.hasMany(db.Post); //1:N
db.Post.belongsTo(db.User); //N:1

//ManyToMany관계에서는 새로운 테이블이 생성된다.
db.Post.belongsToMany(db.HashTag, {through : 'post_hashtag'}); //N:N
db.HashTag.belongsToMany(db.Post, {through : 'post_hashtag'}); //N:N

db.User.belongsToMany(db.User, { through : 'follow', as: 'Followers', foreignKey : 'followingId'}); //일반인.
db.User.belongsToMany(db.User, { through : 'follow', as: 'Following', foreignKey : 'followerId'});  //유명한 사람.

db.User.belongsToMany(db.Post, {through : 'like'});
db.Post.belongsToMany(db.User, {through : 'like'});

module.exports = db;