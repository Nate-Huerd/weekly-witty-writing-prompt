const { Schema, model } = require("mongoose");
const commentSchema = require('./Comment');
const dateFormat = require("../utils/dateFormat");

const storySchema = new Schema(
  {
    storyText: {
      type: String,
      required: "You need to write a story",
      minlength: 1
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

//commentCount
storySchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Story = model("Story", storySchema);

module.exports = Story;
