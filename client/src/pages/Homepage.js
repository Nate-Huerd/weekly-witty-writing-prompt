import React from 'react';
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