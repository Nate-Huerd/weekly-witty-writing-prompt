import React from "react";
import Prompts from "../components/Prompts";
import { QUERY_STORY_BY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import StoryList from '../components/StoryList';
import Auth from '../utils/auth';
import LoginForm from "../components/LoginForm";
import StoryForm from '../components/StoryForm';
import ChangeUsernameForm from "../components/ChangeUsernameForm";
const Dashboard = () => {
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
      <ChangeUsernameForm></ChangeUsernameForm>
        <h1>{user.username}'s Dashboard</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <StoryList stories={stories} title={title}/>
        )}
      <Prompts />
      <h3>story writing area</h3>
      <StoryForm author={user.username}></StoryForm>

      {/* <Stories /> */}
    </div>
  );
  } else if(Auth.loggedIn() === false ) {
    return (<LoginForm />)}
};

export default Dashboard;
