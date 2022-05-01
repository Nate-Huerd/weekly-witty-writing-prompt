import {gql} from '@apollo/client'

export const ADD_STORY = gql`
mutation AddStory($author: String!, $storyText: String!) {
    addStory(author: $author, storyText: $storyText) {
      _id
      storyText
      author{
        username
      }
      createdAt
    }
  }`
export const SIGN_UP = gql`
mutation signUp($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }`
export const LOGIN = gql`
utation Login {
    login {
      token
      user {
       _id
       username 
      }
    }
  }`
export const ADD_COMMENT = gql `
mutation addComment($author: String!, $commentText: String!, $storyId: ID!) {
    addComment(author: $author, commentText: $commentText, storyId: $storyId) {
      _id
      commentText
      author {
       username 
      }
      createdAt
    }
  }`
export const DELETE_COMMENT = gql`
mutation DeleteComment($commentId: ID!, $storyId: ID!) {
    deleteComment(commentId: $commentId, storyId: $storyId)
  }`
export const DELETE_STORIES_BY_AUTHOR = gql`
mutation deleteStoryByAuthor($author: String!) {
    deleteStoryByAuthor(author: $author)
  }`
export const DELETE_STORY_BY_ID = gql`
mutation deleteStoryById($storyId: String!) {
    deleteStoryById(storyId: $storyId)
  }`