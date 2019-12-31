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

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

//ManyToMany관계에서는 새로운 테이블이 생성된다.
db.Post.belongsToMany(db.HashTag, {through : 'PostHashtag'});
db.HashTag.belongsToMany(db.Post, {through : 'PostHashtag'});

db.User.belongsToMany(db.User, { through : 'Follow', as: 'Followers', foreignKey : 'followingId'}); //일반인
db.User.belongsToMany(db.User, { through : 'Follow', as: 'Following', foreignKey : 'followerId'});

db.User.belongsToMany(db.Post, {through : 'Like'});
db.Post.belongsToMany(db.User, {through : 'Like'});

module.exports = db;