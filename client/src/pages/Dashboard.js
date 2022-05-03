import React from "react";
import Prompts from "../components/Prompts";
import { QUERY_STORY_BY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import StoryList from '../components/StoryList';
import Auth from '../utils/auth';
import LoginForm from "../components/LoginForm";
const Dashboard = () => {
  const {loading, data} = useQuery(QUERY_STORY_BY_USER, 
    {variables: {author: "Thiccie-C"}})
    const stories = data?.storyByUser || []
if (Auth.loggedIn() === true) {
  const user = Auth.getProfile().data
  const title = "All " + user.username + "'s Stories"
  
  const handleLogout = () =>{
    Auth.logout()
  }
  
  return (
    <div>
        <h1>{user.username}'s Dashboard</h1>
        <button>Home</button>
        <button onClick={handleLogout}>Logout</button>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <StoryList stories={stories} title={title}/>
        )}
      
    
      <Prompts />
      <h3>story writing area</h3>

      {/* <Stories /> */}
    </div>
  );
  } else if(Auth.loggedIn() === false ) {
    return (<LoginForm />)}
};

export default Dashboard;
