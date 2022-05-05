import React from 'react';
import Prompts from '../Prompts';
import StoryForm from '../StoryForm';
import Auth from '../../utils/auth';
import "./Modal.css";

function Modal({ closeModal }) {
  var user = ''
  if(Auth.loggedIn() === false) {
   user = false
  } else {
    user = Auth.getProfile().data
  }

    return (
        <div className="modalBackdrop" style={{height: "600px"}}>
        <div className="modalContainer" style={{height: "600px"}}>
          <button onClick={() => closeModal(false)} className="btn btn-success"> Close </button>
          <div className="title">
          <Prompts />
          </div>
          <div className="body">
          
          
          <StoryForm author={user.username}></StoryForm>
          </div>
          <div className="footer">
          {/* <button onClick={() => closeModal(false)} className="btn btn-success">
            Back to Dashboard
          </button> */}
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;