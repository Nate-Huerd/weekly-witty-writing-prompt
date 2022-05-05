import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { ADD_STORY } from "../../utils/mutations";
import { Form, Button, Alert } from 'react-bootstrap';
const StoryForm = (author, prompt) => {
    const [storySubmitted, setstorySubmitted] = useState(false)
    const [addStory] = useMutation(ADD_STORY) 
    const [storyFormData, setFormData] = useState({storyText: ''})
    const [currentCharacterCount, setCurrentCharacterCount] = useState(0)
    const handleInputChange = (event) => {
        const { value } = event.target;
        setFormData( {...storyFormData, storyText: value})
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
            await addStory({variables: {author: author.author, storyText: storyFormData.storyText}})
        }
        catch (err){
            console.error(err);
        }
        setstorySubmitted(true)
        setFormData({storyText: ''})
        window.location.reload()
    }
    return(
        <div>
            <p>Character Count: {currentCharacterCount}/5000</p>
            <Form >
                <div className="grow-wrap" style={{height: "320px"}}>
                <textarea name="text" id="text" maxLength="5000" onChange={handleInputChange} style={{width:'100%', height: "100%", resize: 'none'}}></textarea>
                </div>
                <Button style={{display:"flex"}} disabled={(currentCharacterCount === 0)} onClick={handleFormSubmit} className="btn btn-success"  type='submit' >Submit</Button>
                <Alert show={(currentCharacterCount === 0)}>Please write a story</Alert>
                <Alert show={storySubmitted}>Story Submitted Sucessfully!</Alert>
            </Form>
            {overCharacterCount ? <p> you are over the character limit!!!</p> : ''

            }
        </div>
    )
}
export default StoryForm