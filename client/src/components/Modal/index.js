import React from 'react';
import Prompts from '../Prompts';
import StoryForm from '../StoryForm';
import Auth from '../../utils/auth';

function Modal({ closeModal }) {
  var user = ''
  if(Auth.loggedIn() === false) {
   user = false
  } else {
    user = Auth.getProfile().data
  }

    return (
        <div className="modalBackdrop">
        <div className="modalContainer">
          <button onClick={() => closeModal(false)} className="btn btn-success"> X </button>
          <div className="title">
          <Prompts />
          </div>
          <div className="body">
          
          
          <StoryForm author={user.username}></StoryForm>
          </div>
          <div className="footer">
          <button onClick={() => closeModal(false)} className="btn btn-success">
            Back to Dashboard
          </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;