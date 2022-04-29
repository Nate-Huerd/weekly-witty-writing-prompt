const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      maxlength: 500
    },
    author: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Comment = model("Comment", commentSchema);


module.exports = Comment;
