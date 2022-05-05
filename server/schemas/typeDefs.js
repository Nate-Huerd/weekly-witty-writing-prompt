const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    storyCount: Int
    stories: [Story]
    isAdmin: Boolean
  }
  type Prompt {
    _id: ID!
    author: User
    promptText: String!
    stories: [Story]
  }
  type Story {
    _id: ID!
    storyText: String!
    author: User
    createdAt: String
    commentCount: Int
    comments: [Comment]
    upvotes: Int
  }
  type Comment {
    _id: ID!
    commentText: String!
    createdAt: String
    author: User
  }
  type Auth {
    token: ID!
    user: User
  }
  type Donate {
    session: ID
  }
  type Query {
    me: User
    # allStoriesByPrompt: [Story]
    User(username: String!): User
    getAllUsers: [User]
    Story(_id: String): Story
    storyByUser(author: String!): [Story]
    getAllStories: [Story]
    Prompt(_id: ID!): Prompt
    promptByUser(username: String!): [Prompt]
    Top5: [Story]
    Donate: Donate
  }
  type Mutation {
    Upvote(storyId: ID!): Story
    UnUpvote(storyId: ID!): Story
    editUsername(oldUsername: String!, newUsername: String!): User
    login(email: String!, password: String!): Auth
    makeAdmin(username: String!): User
    removeAdmin(username: String): User
    addUser(username: String!, email: String!, password: String!): Auth
    addStory(author: String!, storyText: String!): Story
    addComment(author: String!, commentText: String!, storyId: ID!): Comment
    editComment(commentId: ID!, commentText: String!, storyId: ID!): Comment
    deleteComment(commentId: ID!, storyId: ID!): String
    deleteStoryByAuthor(author: String!): String
    deleteStoryById(storyId: String!): String
    addPrompt(promptText: String!, author: String!): Prompt
  }
`;
module.exports = typeDefs;
