import React, {useState} from "react";
import Auth from '../../utils/auth'
import {ADD_COMMENT} from '../../utils/mutations'
import { useMutation } from "@apollo/client";
import { Alert, Form, Button } from "react-bootstrap";
const CommentForm = ({storyId}) => {
    var user = ''
    const [commentFormData, setCommentFormData] = useState({commentText: ""})
    const [validated] = useState(false);
    const [currentCharacterCount, setCurrentCharacterCount] = useState('0')
    const [addComment] = useMutation(ADD_COMMENT)
    const [showAlert, setShowAlert] = useState(false);
    const handleInputChange = (event) => {
        const commentData = event.target.value
        const commentLength = commentData.split('').length
        setCurrentCharacterCount(commentLength)
        setCommentFormData({commentText: commentData})
    }
    if(!Auth.loggedIn()) {
        return (
            <>
            Please signup/login to comment!
            </>
        )
    }
    if(Auth.loggedIn()) {
        user = Auth.getProfile().data
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const author = user.username
        const commentText = commentFormData.commentText
        console.log(commentText)
        try {
            await addComment({variables: {commentText: commentText, author: author, storyId: storyId}})
        } catch (err){
            console.error(err);
            setShowAlert(true)
        }
        window.location.reload()
    }
    return (
        <>
        <p>{currentCharacterCount}/3000 Characters</p>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group>
            <Form.Label htmlFor="commentText">CommentText</Form.Label>
            <Form.Control
            type='text'
            placeholder="Speak your mind on this story"
            onChange={handleInputChange}
            maxLength='3000'
            value={commentFormData.commentText}
            ></Form.Control>
        </Form.Group>
        <Button
          disabled={!(commentFormData.commentText)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        </Form>
            {/* </textarea>
            <input onClick={handleFormSubmit} type="submit"/>  */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your comment please try again later
        </Alert>
        </>
    )
}
export default CommentForm