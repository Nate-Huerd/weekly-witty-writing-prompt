import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Upvote from '../Upvote'
import {Button, Alert} from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { DELETE_STORY_BY_ID } from '../../utils/mutations';
const StoryList = ({ stories, title }) => {
  const [currentPage] = useState(window.location.href.split('/')[3])
  const [storyDeleteData, setStoryDeleteData] = useState({id: ""})
  const [deleteStory] = useMutation(DELETE_STORY_BY_ID)
  if (!stories.length) {
    return <h3>No Stories Yet</h3>;
  }
  const handleDelete = async (event) =>{
    console.log(event.target.id)
    const storyId = event.target.id
    try {
      await deleteStory({variables: {storyId}})
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  const handleClick = (event) => {
    const id = event.target.id
    setStoryDeleteData({id: id})
  }
  const handleNotDelete = () => {
    setStoryDeleteData({id: ''})
  }
  const isClicked = (story) => {
    const id = story.story._id
    console.log(storyDeleteData)
    if (id === storyDeleteData.id) {
      return true
    }
    return false
  }
  if(currentPage === "Dashboard") {
    return (
      <div>
      <h3>{title}</h3>
      {stories &&
        stories.map((story) => (
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
              <div style={{display: 'flex', justifyContent: 'center'}}>
              <Upvote story={story} ></Upvote>
              </div>
              <Button className='btn btn-danger' id={story._id} onClick={handleClick}>Delete Story</Button>
              <Alert show={isClicked({story})}>Are you sure you would like to delete this masterpiece? <Button id={story._id} onClick={handleDelete}>Yes</Button> <Button onClick={handleNotDelete}>No</Button></Alert>
          </div>
        ))}
    </div>
    )
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
              <div style={{display: 'flex', justifyContent: 'center'}}>
              <Upvote story={story} ></Upvote>
              </div>
          </div>
        ))}
    </div>
  );
};

export default StoryList;