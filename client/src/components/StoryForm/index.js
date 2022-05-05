import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { ADD_STORY } from "../../utils/mutations";
import { Form, Button, Alert } from 'react-bootstrap';
const StoryForm = (author, prompt) => {
    var storySubmitted = false
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
            const response = await addStory({variables: {author: author.author, storyText: storyFormData.storyText}})
            console.log(response)
        }
        catch {
            // console.error(err);
        }
        storySubmitted = true
        setFormData({storyText: ''})
        
    }
    return(
        <div>
            <h2> Start Writing!</h2>
            <p>Character Count: {currentCharacterCount}/5000</p>
            <Form>
                <Form.Control  maxLength="5000" onChange={handleInputChange} type='text' style={{ resize: "none"}}/>
                <Button disabled={(currentCharacterCount === 0)} onClick={handleFormSubmit} className="btn btn-success"  type='submit' >Submit</Button>
                <Alert show={(currentCharacterCount === 0)}>Please write a story</Alert>
                <Alert show={storySubmitted}>Story Submitted Sucessfully!</Alert>
            </Form>
            {overCharacterCount ? <p> you are over the character limit!!!</p> : ''

            }
        </div>
    )
}
export default StoryForm