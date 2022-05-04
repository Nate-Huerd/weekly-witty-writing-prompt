import React, {useState} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_USERS } from '../../utils/queries';
import { EDIT_USERNAME } from '../../utils/mutations';
const ChangeUsernameForm = () => {
    const [validated] = useState(false);
    const [newUsername, setNewUsername] = useState({username: ''})
    const [notOriginal, setNotOriginal] = useState(false)
    const {data} = useQuery(QUERY_ALL_USERS)
    const users = data?.getAllUsers || []
    const [editUsername] = useMutation(EDIT_USERNAME)
    const [clicked, setClicked] = useState(false)
    var Approved = false
    const handleFormSubmit= () => {

    }
    const handleChange = (event) => {
        const usernamevalue= event.target.value
        setNewUsername({...newUsername, username: usernamevalue})
    }
    const checkAvailability = (data) => {
        for(var i = 0; i < data.length; i++){
            if(newUsername.username === data[i].username) {
                setNotOriginal(true)
                
                return
            }
        }
        setClicked(true)
        setNotOriginal(false)
        console.log(notOriginal)
    }
    if(notOriginal === false && clicked === true) {
        Approved = true
    }
    return (
    <Form validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group>
            <Form.Label htmlFor="username">Change your Username!</Form.Label> <br/>
        <Form.Control
        type="text"
        placeholder='new username'
        name='username'
        onChange={handleChange}
        value={newUsername.username}
        required
        />
        <Form.Control.Feedback type='invalid'>Username is required</Form.Control.Feedback>
        </Form.Group>
        <Button
        type="submit"
        variant='success'
        disabled={notOriginal}>Submit
        </Button>
        <Button
        onClick={() =>checkAvailability(users)}
        variant='success'
        disabled={(newUsername.username === '')}
        >
            Check Availability
        </Button>
        <Alert show={notOriginal}>
            Username already exist please enter a different one!
        </Alert>
        <Alert show={Approved}>
            UserName is available!
        </Alert>
    </Form>
    )
}

export default ChangeUsernameForm