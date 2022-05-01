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