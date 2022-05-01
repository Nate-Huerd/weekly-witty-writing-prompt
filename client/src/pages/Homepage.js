import React from 'react';
// import { useQuery } from "@apollo/client";
// import { QUERY_THOUGHTS } from "../utils/queries";
// import ThoughtList from '../components/ThoughtList';

import Prompts from "../components/Prompts";
import Stories from "../components/Stories";
import Comments from "../components/Comments";

// Home should show Prompt and user Stories
// need pages set up for Stories,
const Home = () => {
    return (
        <div className='container'>
            <Prompts />
            <Stories />
            <Comments />
        </div>
    );
};

export default Home;