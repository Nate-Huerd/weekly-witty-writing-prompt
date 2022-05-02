import React from "react";
import Prompts from "../components/Prompts";
// import Stories from "../components/Stories";
import { QUERY_STORY_BY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
const Dashboard = () => {
  allUserStories = useQuery(QUERY_STORY_BY_USER)
  
  return (
    <div>
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
