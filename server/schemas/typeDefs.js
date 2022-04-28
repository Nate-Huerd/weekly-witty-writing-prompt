const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        storyCount: Int
        stories: [String]
    }.
    type Prompt {
        _id: ID!
        prompt: String
        stories: Story
    }.
    type Story {
        _id: ID!
        storyText: STRING!
        AUTHOR: User
        createdAt: Date
        upvotes: INT
        commentCount: INT
        Comments: [Comment]
    },
    type Comment {
        _id: ID!
        commentText: String!
        createdAt: Date
    },
    type Auth {
        token: ID!
        user: User
    },
    type Queries {
        me: User
        allStoriesByPrompt: [Story]
    }
    type Mutation {
        login: Auth
        addUser: User
        addStory: Story
        addComment: Comment
        addPrompt: Prompt
    }
`
module.exports = typeDefs