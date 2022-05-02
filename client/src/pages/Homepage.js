import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_STORY } from "../utils/queries";
import StoryList from "../components/StoryList";

// import Prompts from "../components/Prompts";
// import Stories from '../components/StoriesForm';
// import Comments from "../components/Comments";
// Home should show Prompt and user Stories
// need pages set up for Stories,
const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_STORY);
  const story = data?.story || [];
  console.log(story);

  return (
    <div className="container">
      {/* <Prompts /> */}
      <StoryList />
      {/* <Comments /> */}
    </div>
  );
};

export default Home;
