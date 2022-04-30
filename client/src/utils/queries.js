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
