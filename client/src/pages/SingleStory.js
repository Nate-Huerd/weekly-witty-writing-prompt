import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_STORY } from '../utils/queries';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentsForm';
const SingleStory = props => {

    const { id: storyId } = useParams();
    console.log(storyId);
    const { loading, data } = useQuery(QUERY_STORY, {
        variables: { id: storyId }
      });
      console.log(data); //it doesn't like this
      const story = data?.Story || {};
      
      if (loading) {
        return <div>Loading...</div>;
      }
    
    return (
      <div>
        <div className="card mb-3">
          <p className="card-header">
            <span style={{ fontWeight: 700 }} className="text-dark">
              {story.author.username}
            </span>{' '}
             {story.createdAt}
          </p>
          <div className="card-body">
            <p>{story.storyText}</p>
            <p>Upvotes: {story.upvotes} go to homepage to upvote</p>
          </div>
        </div>

        {story.commentCount > 0 && <CommentList comments={story.comments} />}
        <CommentForm storyId={story._id}></CommentForm>
      </div>
    );
  };
  
  export default SingleStory;
  