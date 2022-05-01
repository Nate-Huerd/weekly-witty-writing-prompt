import React from "react";
import Prompts from "../components/Prompts";
// import Stories from "../components/Stories";

const Dashboard = () => {
  return (
    <div>
        <Stories />
        <h1>USERNAME'S Writing Prompts</h1>
        <button>Home</button>
        <button>Logout</button>

    
      <Prompts />
      <h3>story writing area</h3>

      {/* <Stories /> */}
    </div>
  );
};

export default Dashboard;
