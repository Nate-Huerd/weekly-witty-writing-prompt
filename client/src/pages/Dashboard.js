import React, {useState} from "react";
import Prompts from "../components/Prompts";
import { QUERY_STORY_BY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import StoryList from '../components/StoryList';
import Auth from '../utils/auth';
import LoginForm from "../components/LoginForm";
// import StoryForm from '../components/StoryForm';
import ChangeUsernameForm from "../components/ChangeUsernameForm";
import Modal from '../components/Modal';

const Dashboard = () => {

const [openModal, setOpenModal] = useState(false);

  var user = ''
  if(Auth.loggedIn() === false) {
   user = false
  } else {
    user = Auth.getProfile().data
  }
  const {loading, data} = useQuery(QUERY_STORY_BY_USER,
  {variables: {author: user?.username}, skip: user === false})
  const stories = data?.storyByUser || []
if (Auth.loggedIn() === true) {
  const title = "All " + user.username + "'s Stories"
  return (
    <div>
      <h1>{user.username}'s Dashboard</h1>
      <ChangeUsernameForm></ChangeUsernameForm>

      <Prompts />
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <StoryList stories={stories} title={title}/>
        )}
    
      {/* <StoryForm author={user.username}></StoryForm> */}
      <button className="openModalBtn btn btn-success" onClick={() => {
        setOpenModal(true);
      }}
      >
        Write a story!
        </button>
      {openModal && <Modal closeModal={setOpenModal}/>}

      {/* <Stories /> */}
    </div>
  );
  } else if(Auth.loggedIn() === false ) {
    return (<LoginForm />)}
};

export default Dashboard;
