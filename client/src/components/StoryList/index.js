import React from 'react';
import { Link } from 'react-router-dom';
import Upvote from '../Upvote'
const StoryList = ({ stories, title }) => {
  if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {stories &&
        stories.map(story => (
          <div key={story._id} className="card mb-3">
            <Link  style={{ textDecoration: 'none' }} to={`/story/${story._id}`} className='btn'>
            <h3>Author: {story.author.username}</h3>
            <p className="card-header">
              {/* {story.author} */}
              Wrote on {story.createdAt}
            </p>
            <div className="card-body ">
              <p>{story.storyText}</p>
              <p className="mb-0">
                Comments: {story.commentCount} || Click to{' '}
                {story.commentCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
              </Link>
              <Upvote story={story}></Upvote>
          </div>
        ))}
    </div>
  );
};

export default StoryList;