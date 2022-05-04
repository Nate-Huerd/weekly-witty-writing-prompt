import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { ADD_STORY } from "../../utils/mutations";
const StoryForm = (author, prompt) => {
    const [addStory] = useMutation(ADD_STORY) 
    const [storyFormData, setUserFormData] = useState({storyText: ''})
    const [currentCharacterCount, setCurrentCharacterCount] = useState('0')
    const handleInputChange = (event) => {
        const { value } = event.target;
        setUserFormData( {...storyFormData, storyText: value})
        const wordLength = value.split('')
        setCurrentCharacterCount(wordLength.length)
      };
      var overCharacterCount = false
      if(currentCharacterCount === 5000) {
          overCharacterCount = true
      }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await addStory({variables: {author: author.author, storyText: storyFormData.storyText}})
            console.log(response)
        }
        catch {
            // console.error(err);
        }
    }
    return(
        <div>
            <h2> Start Writing!</h2>
            <p>Character Count: {currentCharacterCount}/5000</p>
            <form>
                <textarea maxLength="5000" onChange={handleInputChange} type='text' style={{ resize: "none", height: "400px", width: "400px"}}></textarea>
                <button onClick={handleFormSubmit} className="btn btn-success"  type='submit' >Submit</button>
            </form>
            {/* <script>
                function handleFormSubmit() {
                    alert("Your story has been submitted!")
                }
            </script> */}
            {overCharacterCount ? <p> you are over the character limit!!!</p> : ''

            }
        </div>
    )
}
export default StoryForm