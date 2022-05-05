import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_ALL_USERS } from '../utils/queries'
import { DELETE_STORIES_BY_AUTHOR, REMOVE_ADMIN, MAKE_ADMIN } from '../utils/mutations'
import {Button, Alert} from 'react-bootstrap'
const Userspage =() => {
    const {loading, data} = useQuery(QUERY_ALL_USERS)
    const allUsers = data?.getAllUsers || []
    const [purgeUser] = useMutation(DELETE_STORIES_BY_AUTHOR)
    const [makeAdmin] = useMutation(MAKE_ADMIN)
    const [removeAdmin] = useMutation(REMOVE_ADMIN)
    const [storyUserData, setUserDeleteData] = useState({id: ""})
    const handlePurge = async (event) => {
        const user = event.target.id
        console.log(user)
        try {
            const response = await purgeUser({variables: {author: user}})
            console.log(response)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    const handleRemoveAdmin = (event) => {
        const username = event.target.id
        console.log(username)
        try {
            removeAdmin({variables: {username}})
        } catch (err) {

        }
    }
    const handleMakeAdmin = (event) => {
        const username = event.target.id
        console.log(username)
        try {
            makeAdmin({variables: {username}})
        } catch (err) {

        }
    }
    const handleClick = (event) => {
        const id = event.target.id
        setUserDeleteData({id: id})
      }
      const handleNotDelete = () => {
        setUserDeleteData({id: ''})
      }
    const isClicked = (user) => {
        const id = user.user._id
        console.log(id)
        console.log(storyUserData)
        if (id === storyUserData.id) {
          return true
        }
        return false
      }
    console.log(allUsers)
    return (
        <div>
            {loading ?   <h2>Loading</h2>:""}
        {allUsers && allUsers.map(user => (
            <div key={user._id} className="card mb-3">
            <h3 className='card-header'>{user.username}</h3>
            <div className='card-body'>
            <p>Stories Written: {user.storyCount}</p>
            {user.isAdmin
                    ?
                    <div>
                        <Button id={user.username} onClick={handleRemoveAdmin}>Remove Admin</Button> 
                    </div>
                    : 
                    <div>
                        <Button id={user.username} onClick={handleMakeAdmin}>Make Admin</Button>   
                        {(user.storyCount === 0) ? '': 
                        <div>
                            <Button id={user._id} onClick={handleClick} className="btn-danger">Purge User</Button>
                            <Alert id={user.username} show={isClicked({user})}>Are you sure you want to purge {user.username}?? <Button onClick={handlePurge}>Yes</Button> <Button onClick={handleNotDelete}>No</Button></Alert>
                        </div>
                        }
                    </div>
            }
            </div>
            </div>
        )

        )

        }
        </div>
    )
}
export default Userspage