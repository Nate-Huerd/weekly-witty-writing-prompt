import React from 'react'
import { useMutation } from '@apollo/client';
import { ADD_STORY } from '../../utils/mutations'
const storyForm = () => {
    const addStory = useMutation(ADD_STORY)
    const handleStorySubmit = (e) => {
        e.preventDefault
        // try {
        //     await addStory({variable})
        // }
        // catch {
        //     console.error(e)
        // }
    }
    return(
        <div className='AddStory'>
            <form>
                <input type='text'/>
                <input type="button" onClick={storyForm}/>
            </form>
        </div>
    )
}
export default storyForm