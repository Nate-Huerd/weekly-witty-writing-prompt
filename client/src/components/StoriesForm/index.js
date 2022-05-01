import React from 'react'
import { useMutation } from '@apollo/client';
import { ADD_STORY } from '../../utils/mutations'
const Stories = () => {
    const addStory = useMutation(ADD_STORY)
    const handleStorySubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        try {
             await addStory({})
        }
        catch {
            console.error(e)
        }
    }
    return (
        <div className='AddStory'>
            <form>
                <input type='text'/>
                <input type="button" onClick={handleStorySubmit}/>
            </form>
        </div>
    );
};
export default Stories