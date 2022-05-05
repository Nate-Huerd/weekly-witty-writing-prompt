import { gql } from '@apollo/client';

export const QUERY_USER = gql ` 
query user($username: String!) {
    User(username: $username) {
        _id
        username
        email
        storyCount
        stories {
            _id
            storyText
            createdAt
            commentCount
            comments {
                _id
                commentText
                createdAt
            }
        }
    }
}
`
export const QUERY_ME = gql`
query Me {
    me {
      _id
      username
      email
      storyCount
      isAdmin
    }
}
`
// export const QUERY_STORIES = gql`
//   query stories($username: String) {
//     stories(username: $username) {
//         _id
//         storyText
//         author {
//             username
//         }
//         createdAt
//         upvotes
//         commentCount
//         comments {
//             _id
//             commentText
//             author {
//                 username
//             }
//             createdAt
//         }
//   }
// `;

export const QUERY_GET_ALL_STORIES = gql`
 {
    getAllStories {
        _id
        storyText
        author {
             username
        }
        createdAt
        commentCount
        comments {
            _id
            commentText
            createdAt
        }
        upvotes
  }
  }
  
`;

export const QUERY_STORY = gql `
query story($id: String!) {
    Story(_id: $id) {
        _id
        storyText
        author {
            username
        }
        createdAt
        commentCount
        comments {
            _id
            commentText
            author {
                username
            }
            createdAt
        }
        upvotes
    }

}`

export const QUERY_STORY_BY_USER = gql `
query storyByUser ($author: String!) {
    storyByUser(author: $author) {
        author {
            username
        }
        _id
        storyText
        createdAt
        commentCount
        upvotes
    }
}`
export const QUERY_ALL_USERS = gql`
query GetAllUsers {
    getAllUsers {
        isAdmin
        _id
        username
        email
        storyCount
    }
}`
export const TOP_5 = gql`
query Top5 {
    Top5 {
      _id
      storyText
      author {
       username 
      }
      createdAt
      commentCount
      comments {
        commentText
      }
      upvotes
    }
  }`