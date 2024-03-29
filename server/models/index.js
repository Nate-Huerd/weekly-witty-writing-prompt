// import all models
const Story = require('./Story');
const User = require('./User');
const Comment = require('./Comment');
const Prompt = require('./Prompt')
// create associations
/*
User.hasMany(story, {
    foreignKey: 'user_id'
  });
  
  Story.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  User.belongsToMany(story, {
    through: Vote,
    as: 'voted_storys',
  
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  story.belongsToMany(User, {
    through: Vote,
    as: 'voted_storys',
    foreignKey: 'story_id',
    onDelete: 'SET NULL'
  });

  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  story.hasMany(Vote, {
    foreignKey: 'story_id'
  });
  
  Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  Comment.belongsTo(story, {
    foreignKey: 'story_id',
    onDelete: 'SET NULL'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  story.hasMany(Comment, {
    foreignKey: 'story_id'
  });
  */
  module.exports = { User, Story, Comment, Prompt };
  