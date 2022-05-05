import React, {useState} from "react";
import Prompts from "../components/Prompts";
import { QUERY_STORY_BY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import StoryList from '../components/StoryList';
import Auth from '../utils/auth';
import LoginForm from "../components/LoginForm";
import Modal from '../components/Modal';
import ModalTwo from '../components/ModalTwo';

const Dashboard = () => {

const [openModal, setOpenModal] = useState(false);

const[openModalTwo, setOpenModalTwo] = useState(false);

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

<button className="openModalTwoBtn btn btn-success"onClick={() => {
        setOpenModalTwo(true);
      }}
      >
        Change Username
        </button>
      {openModalTwo && <ModalTwo closeModalTwo={setOpenModalTwo}/>}
     

      <Prompts />
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <StoryList stories={stories} title={title}/>
        )}
    
    <h2> Start Writing!</h2>
      <button className="openModalBtn btn btn-success" onClick={() => {
        setOpenModal(true);
      }}
      >
        Create Story
        </button>
      {openModal && <Modal closeModal={setOpenModal}/>}

      {/* <Stories /> */}
    </div>
  );
  } else if(Auth.loggedIn() === false ) {
    return (<LoginForm />)}
};

export default Dashboard;
