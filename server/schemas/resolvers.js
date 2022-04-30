const { Comment, Story, User } = require('../models')

const resolvers = {
    Query: {
        // me: async (parent, args, context) => {
        //     if (context.user) {
        //         const userData = await User.findOne({ _id: context.user._id})
        //         .select('-_v -password')
        //         .populate('thouights')
        //         .populate('stories')
        //         return 
        //     }
        //     throw new AuthentionError('Not logged in')
        // },
        User: async () => {
            const user= await User.find()
            .select('-__v -password')
            .populate('stories')
            console.log(user)
            return user[0]
        },
        // prompt: async () => { 
        // }.
        Story: async (parent, args) => {
            return Story.findById(args._id)
        },
        storyByUser: async (parent, {author}) => {
            const stories = await Story.find({author}).populate('comments')
            console.log(stories)
            return stories
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            console.log(user)
            return user[0]
        },
        addStory: async (parent, args) => {
            const author = await User.findOne({username: args.author})
            console.log(author)
            const story = await Story.create({author: author, storyText: args.storyText})
            console.log(story)
            return story
        },
        addComment: async (parent, args) => {
            const updatedComment = await Story.findOneAndUpdate({_id: args.storyId},{$push: {comments: {commentText: args.commentText, author: args.author}}}, {new: true, runvalidators: true})
            const index = updatedComment.comments.length - 1
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
        deleteStory: async (parent, args) => {
            const deletedStory = await Story.deleteMany({author: args.author})
            return "All Stories By " + args.author + " have been deleted"
        }
    }
}
module.exports = resolvers