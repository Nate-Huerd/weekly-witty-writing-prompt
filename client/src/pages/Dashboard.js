import React from "react";
import Stories from "../components/Stories";
import loginForm from '../components/LoginForm'
const Dashboard = () => {
  return (
    <div>
        <Stories />
        <loginForm />
        <h1>USERNAME'S Writing Prompts</h1>
        <button>Home</button>
        <button>Logout</button>

        <h2>This Week's Writing Prompt</h2>
      <h3>story writing area</h3>

      <h3>list of previous stories</h3>
    </div>
  );
};

export default Dashboard;
