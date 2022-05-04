import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import {UPVOTE, UNUPVOTE} from '../../utils/mutations'
import Auth from '../../utils/auth'
import {Button} from 'react-bootstrap'
const Upvote = (story) => {
    var user =''
    const storydata = story.story
    const [upvoted, setUpvoted] = useState(false)
    const [upvote] = useMutation(UPVOTE)
    const [unupvote] = useMutation(UNUPVOTE)
    const storyId = storydata._id
    if(Auth.loggedIn()) {
         user = Auth.getProfile().data.username
    }
    const handleUpvote = async () => {
        setUpvoted(true)
        try {
            await upvote({variables: {storyId}})
        }
        catch (err){
            console.log(err)
        }
    }
    const handleUnupvote = async () => {
        setUpvoted(false)
        try {
            await unupvote({variables: {storyId}})
        }
        catch (err){
            console.log(err)
        }
    } 
    if(user === storydata.author.username) {
        return (
            <div></div>
        )
    }


    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
           
            {upvoted ?
            <Button onClick={handleUnupvote}>UnUpvote</Button> : <Button onClick={handleUpvote}>Upvote</Button>
            }
            <p>Upvotes: {story.story.upvotes}</p>
        </div>    
    )
}
export default Upvote