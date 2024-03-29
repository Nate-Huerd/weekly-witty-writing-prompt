import { gql } from "@apollo/client";

export const ADD_STORY = gql`
  mutation AddStory($author: String!, $storyText: String!) {
    addStory(author: $author, storyText: $storyText) {
      _id
      storyText
      author {
        username
      }
      createdAt
    }
  }
`;
export const SIGN_UP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token 
      user{
        username
      }
    }
  }
`;
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        isAdmin
      }
    }
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($author: String!, $commentText: String!, $storyId: ID!) {
    addComment(author: $author, commentText: $commentText, storyId: $storyId) {
      _id
      commentText
      author {
        username
      }
      createdAt
    }
  }
`;
export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!, $storyId: ID!) {
    deleteComment(commentId: $commentId, storyId: $storyId)
  }
`;
export const DELETE_STORIES_BY_AUTHOR = gql`
  mutation deleteStoryByAuthor($author: String!) {
    deleteStoryByAuthor(author: $author)
  }
`;
export const DELETE_STORY_BY_ID = gql`
  mutation deleteStoryById($storyId: String!) {
    deleteStoryById(storyId: $storyId)
  }
`;
export const EDIT_USERNAME = gql`
  mutation EditUsername($oldUsername: String!, $newUsername: String!) {
    editUsername(oldUsername: $oldUsername, newUsername: $newUsername) {
      _id
      username
      email
    }
  }
`;
export const UPVOTE = gql`
mutation Upvote($storyId: ID!) {
  Upvote(storyId: $storyId) {
    _id
    storyText
    createdAt
    commentCount
    upvotes
  }
}
`
export const UNUPVOTE = gql`
mutation UnUpvote($storyId: ID!) {
  UnUpvote(storyId: $storyId) {
    _id
    storyText
    createdAt
    commentCount
    upvotes
  }
}
`

export const MAKE_ADMIN = gql`
mutation MakeAdmin($username: String!) {
  makeAdmin(username: $username) {
    _id
    username
    email
    storyCount
    isAdmin
  }
}`
export const REMOVE_ADMIN = gql`
mutation RemoveAdmin($username: String) {
  removeAdmin(username: $username) {
    _id
    username
    email
    storyCount
    isAdmin
  }
}
`