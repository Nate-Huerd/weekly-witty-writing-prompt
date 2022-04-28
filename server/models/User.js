const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    stories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story'
      }
    ],

  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

//story count
userSchema.virtual('storyCount').get(function() {
    return this.stories.length;
  });

const User = model('User', userSchema);

module.exports = User;