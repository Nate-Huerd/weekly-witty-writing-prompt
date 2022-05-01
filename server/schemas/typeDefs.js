const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    storyCount: Int
    stories: [String]
  }
  type Prompt {
    _id: ID!
    prompt: String
    stories: Story
  }
  type Story {
    _id: ID!
    storyText: String!
    author: User
    createdAt: String
    commentCount: Int
    comments: [Comment]
  }
  type Comment {
    _id: ID!
    commentText: String!
    author: User
    createdAt: String
    author: User
  }
  
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    # me: User
    # allStoriesByPrompt: [Story]
    User(username: String!): User
    Story(_id: String): Story
    storyByUser(author: String!): [Story]
  }
  type Mutation {
    login: Auth
    addUser(username: String!, email: String!, password: String!): User
    addStory(author: String!, storyText: String!): Story
    addComment(author: String!, commentText: String!, storyId: ID!): Comment
    editComment(commentId: ID!, commentText: String!, storyId: ID!): [Comment]
    deleteComment(commentId: ID!, storyId: ID!): String
    deleteStory(author: String!): String
    addPrompt: Prompt
  }
`;
module.exports = typeDefs;
