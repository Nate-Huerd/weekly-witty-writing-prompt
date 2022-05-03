import React from 'react';

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
            <h3>Author: {story.author.username}</h3>
            <p className="card-header">
              {/* {story.author} */}
              Wrote on {story.createdAt}
            </p>
            <div className="card-body">
              <p>{story.storyText}</p>
              <p className="mb-0">
                Comments: {story.commentCount} || Click to{' '}
                {story.commentCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default StoryList;