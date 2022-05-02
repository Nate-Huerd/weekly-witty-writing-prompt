import { gql } from '@apollo/client';

export const QUERY_USER = gql ` 
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        storyCount
        stories {
            _id
            storyText
            createdAt
            upvotes
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
        upvotes
        commentCount
        comments {
            _id
            commentText
            author {
                username
            }
            createdAt
        }
    }

}`

export const QUERY_STORY_BY_USER = gql `
query storyByUser ($author: String!) {
    storyByUser(author: $author) {
        _id
        storyText
        createdAt
        commentCount
    }
}`
