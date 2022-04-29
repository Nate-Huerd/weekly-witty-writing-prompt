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
        user: async () => {
            return User.find()
            .select('-__v -password')
            .populate('stories')
        },
        // prompt: async () => { 
        // }.
        comment: async (parent, args) => {
            const storyData = Story.findbyID({_id: args._id}).populate('comments')
            return storyData.comments
        },
        comments: async () => {
            return Comment.find().sort({ createdAt: -1})
        },
        story: async () => {
            return Story.find()
        },
    },
    Mutations: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
        }
    }
}
module.exports = resolvers