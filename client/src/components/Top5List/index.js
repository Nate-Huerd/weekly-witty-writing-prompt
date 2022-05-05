import React from 'react';
import { Link } from 'react-router-dom';
const Top5List = (storiesdata) => {
    const stories= storiesdata.stories
    const firstplace = [stories[0]]
    const secondPlace = [stories[1]]
    const thirdPlace = [stories[2]]
    console.log(firstplace, secondPlace, thirdPlace)
    const otherStories = [stories[3], stories[4]]
    if(otherStories === undefined || secondPlace === undefined|| firstplace === undefined|| thirdPlace === undefined) {
      return (
        <div>
          not enough entries to display
        </div>
      )
    }
    return (
        <div>
            {firstplace && firstplace.map(story => (
              <div key={story._id} className="card mb-3">
                <Link  style={{ textDecoration: 'none' }} to={`/story/${story._id}`} className='btn'>
                {
                    
                }
                <h2 style={{color: '#D6AF36'}}>FIRST PLACE WITH {story.upvotes} UPVOTES</h2>
                <h3 >Author: {story.author.username}</h3>

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
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                  </div>
              </div>
            ))}
            {secondPlace && secondPlace.map(story => (
              <div key={story._id} className="card mb-3">
                <Link  style={{ textDecoration: 'none' }} to={`/story/${story._id}`} className='btn'>
                {
                    
                }
                <h2 style={{color: '#D7D7D7'}}>SECOND PLACE WITH {story.upvotes} UPVOTES</h2>
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
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                  </div>
              </div>
            ))}
            {thirdPlace && thirdPlace.map(story => (
              <div key={story._id} className="card mb-3">
                <Link  style={{ textDecoration: 'none' }} to={`/story/${story._id}`} className='btn'>
                {
                    
                }
                <h2 style={{color: '#824A02'}}>THIRD PLACE WITH {story.upvotes} UPVOTES</h2>
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
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                  </div>
              </div>
            ))}
          {otherStories &&
            otherStories.map(story => (
              <div key={story._id} className="card mb-3">
                <Link  style={{ textDecoration: 'none' }} to={`/story/${story._id}`} className='btn'>
                {
                  
                }
                <h2 style={{color: '#3A3B3C'}}>RUNNER UP WITH {story.upvotes} UPVOTES</h2>
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
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                  </div>
              </div>
            ))}
        </div>
      );
}
export default Top5List