const { Comment, Story, User, Prompt } = require('../models')


const {AuthenticationError} = require('apollo-server-express')
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
              return userData;
            }
      
            throw new AuthenticationError('Not logged in');
          },
            User: async (parent, {username}) => {
            const user= await User.findOne({username})
            .select('-__v -password')
            .populate('stories')
            return user
            },
        getAllUsers: async () => {
            const users = await User.find().populate('stories')
            return users
        },
        Prompt: async () => {
            const prompt = await Prompt.find()
            .populate('prompt')
            return prompt
        },
        promptByUser: async (parent, args) => {
            const user= await User.findOne({username})
            const prompts = await Prompt.find({user}).populate('prompt')
            return prompts
        },

        Story: async (parent, args) => {
            return await Story.findById(args._id).populate('author')
            .populate({path: 'comments', populate: { path: 'author', model: 'User'}})
        },
        storyByUser: async (parent, args) => {
            const author = await User.findOne({username: args.author})
            const stories = await Story.find({author}).populate('comments').populate('author')
            return stories
        },
        getAllStories: async () => {
            const stories = await Story.find().populate('comments').populate('author').sort( {createdAt: -1})
            .populate({path: 'comments', populate: { path: 'author', model: 'User'}})
            return stories
        }

    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        editUsername: async (parent, args) => {
            const changedUser = await User.findOneAndUpdate({username: args.oldUsername}, {$set: {username: args.newUsername}}, {new: true, runValidators: true})
            return changedUser
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return user
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
        addStory: async (parent, args) => {
            const author = await User.findOne({username: args.author})
            console.log(author) 
            const story = await Story.create({author: author, storyText: args.storyText})
            await User.findOneAndUpdate({username: args.author}, {$addToSet: {stories: story}})
            console.log(story)
            return story
        },
        addComment: async (parent, args) => {
            const commentAuthor = await User.findOne({username: args.author})
            console.log(commentAuthor.username)
            const updatedComment = await Story.findOneAndUpdate({_id: args.storyId},{$addToSet: {comments: {commentText: args.commentText, author: commentAuthor}}}, {new: true, runvalidators: true})
            .populate({path: 'comments', populate: { path: 'author', model: 'User'}})
            const index = updatedComment.comments.length - 1
            console.log(updatedComment.comments[index])
            return updatedComment.comments[index]
        },
        // editComment: async (parent, args) => {
            // const comment = await Story.findOneAndUpdate(, {new: true, runValidators: true})
            // console.log(comment)
        // },
        deleteComment: async (parent, args) => {
            const deletedComment = await Story.findOneAndUpdate({_id: args.storyId}, {$pull: {comments: {_id: args.commentId}}}, {new: true})
            return "comment with ID " + args.commentId +" has been deleted"
        },
        deleteStoryByAuthor: async (parent, args) => {
            const author = await User.findOne({username: args.author})
            const deletedStory = await Story.deleteMany({author: author})
            return "All Stories By " + args.author + " have been deleted"
        },
        deleteStoryById: async (parent, {storyId}) => {
            const deletedStory = await Story.deleteOne({_id: storyId})
            console.log(deletedStory)
            if (deletedStory.deletedCount === 0) {
                return "No Story with that ID"
            }
            else {
                return "Story has been deleted"
            }
        },
        makeAdmin: async (parent, {username}) => {
            const newAdmin = await User.findOneAndUpdate({username}, {$set: {isAdmin: true}}, {new: true})
            return newAdmin
        },
        removeAdmin: async (parent, {username}) => {
            const notAdmin = await User.findOneAndUpdate({username}, {$set: {isAdmin: false}}, {new: true})
            return notAdmin
        },
        addPrompt: async (parent, args) => {
            const prompt = await Prompt.create({promptText: args.promptText})
            await User.findOneAndUpdate({$addToSet: {prompts: prompt}})
            console.log(prompt)
            return prompt
        }
    }
}
module.exports = resolvers
