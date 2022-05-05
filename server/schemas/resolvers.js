const { Story, User, Prompt } = require('../models')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
        Prompt: async (parent, args) => {
            const prompt = await Prompt.find({_id: args.promptId})
            .populate('author')
            return prompt
        },
        promptByUser: async (parent, args) => {
            const user= await User.findOne({username: args.username})
            const prompts = await Prompt.find({author: user}).populate('author')
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
        },
        Top5: async () => {
            const stories = await Story.find({upvotes: {$gt: 0}}).populate('comments').populate('author').sort( {upvotes: -1})
            .populate({path: 'comments', populate: { path: 'author', model: 'User'}})
            const storiesArray = []
            for(var i=0; i < 5; i++) {
                storiesArray.push(stories[i])
            }
            return storiesArray
        },
        Donate: async (parent, args, context) => {
            var urltext = ''
            if(context.headers.host  === 'localhost:3001' ){
                urltext='http://localhost:3000'
            } else {
                urltext ="https://weekly-witty-writing-prompts.herokuapp.com"
            }
            const url = new URL(urltext);
            const product = await stripe.products.create({
                name: "Premium Membership",
                description: "Donate 5$ to gain premium benefits"
            });
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: 500,
                currency: 'usd'
            })
            const line_items = [{price: price.id, quantity: 1}]
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/donate`
              });
              
              return { session: session.id };
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
            return { token, user };
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
            const story = await Story.create({author: author, storyText: args.storyText})
            await User.findOneAndUpdate({username: args.author}, {$addToSet: {stories: story}})
    
            return story
        },
        addComment: async (parent, args) => {
            const commentAuthor = await User.findOne({username: args.author})
            const updatedComment = await Story.findOneAndUpdate({_id: args.storyId},{$addToSet: {comments: {commentText: args.commentText, author: commentAuthor}}}, {new: true, runvalidators: true})
            .populate({path: 'comments', populate: { path: 'author', model: 'User'}})
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
        deleteStoryByAuthor: async (parent, args) => {
            const author = await User.findOne({username: args.author})
            const deletedStory = await Story.deleteMany({author: author})
            return "All Stories By " + args.author + " have been deleted"
        },
        deleteStoryById: async (parent, {storyId}) => {
            const deletedStory = await Story.deleteOne({_id: storyId})
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
            const author = await User.findOne({username: args.author})
            const prompt = await Prompt.create({author: author, promptText: args.promptText})
            await User.findOneAndUpdate({$addToSet: {prompts: prompt}})
            return prompt
        },
        Upvote: async (parent, args) => {
            const upvotedStory = await Story.findById(args.storyId)
            const addUpvoteValue = upvotedStory.upvotes + 1 
            return await Story.findOneAndUpdate({_id: args.storyId}, {$set: {upvotes: addUpvoteValue}}, {new: true})
        },
        UnUpvote: async (parent, args) => {
            const upvotedStory = await Story.findById(args.storyId)
            const subtractUpvoteValue = upvotedStory.upvotes -1
            return await Story.findOneAndUpdate({_id: args.storyId}, {$set: {upvotes: subtractUpvoteValue}}, {new: true})
        }
    }
}
module.exports = resolvers
