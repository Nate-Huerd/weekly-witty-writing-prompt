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
    upvotes: Int
    commentCount: Int
    comments: [Comment]
  }
  type Comment {
    _id: ID!
    commentText: String!
    createdAt: String
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
    Comment(_id: ID!): Comment
  }

  type Mutation {
    login: Auth
    addUser(username: String!, email: String!, password: String!): User
    addStory: Story
    addComment: Comment
    addPrompt: Prompt
  }
`;
module.exports = typeDefs;
