import React, {useState} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_USERS } from '../../utils/queries';
import { EDIT_USERNAME } from '../../utils/mutations';
import Auth from '../../utils/auth'
const ChangeUsernameForm = () => {
    const [validated] = useState(false)
    const [newUsername, setNewUsername] = useState({username: ''})
    const [notOriginal, setNotOriginal] = useState(false)
    const {data} = useQuery(QUERY_ALL_USERS)
    const users = data?.getAllUsers || []
    const [editUsername] = useMutation(EDIT_USERNAME)
    const [clicked, setClicked] = useState(false)
    const [Approved, setApproved] = useState(false)
    var NameChangeDidntWorked = false
    const [nameChanged, setnameChanged] =useState(false)
    const handleFormSubmit= async(event) => {
        event.preventDefault()
        const currentUsername = Auth.getProfile().data.username
        try {
           const response = await editUsername({variables: {oldUsername: currentUsername, newUsername: newUsername.username}})
           if(!response.data) {
            NameChangeDidntWorked = true
        }
        console.log(response)
        setnameChanged(true)
        }
        catch {

        }
       
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
        setApproved(true)
    }
    const logout = () => {
        Auth.logout()
    }
    return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
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
        <Alert dismissible onClose={() => setApproved(false)}show={Approved}>
            UserName is available!
        </Alert>
        <Alert dismissible onClose={() => NameChangeDidntWorked = false} show={NameChangeDidntWorked}>
            NAME CHANGE FAILURE
        </Alert>
        <Alert show={nameChanged}>
            Name Change success please <a href='/'onClick={logout}> LOGOUT </a>to reload page with new info
        </Alert>
    </Form>
    )
}

export default ChangeUsernameForm