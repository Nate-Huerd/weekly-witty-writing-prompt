import React from 'react';
import ChangeUsernameForm from "../ChangeUsernameForm";
import "./ModalTwo.css";


function ModalTwo({ closeModalTwo }) {
  
    return (
        <div className="modalTwoBackdrop">
        <div className="modalTwoContainer">
          <button onClick={() => closeModalTwo(false)} className="btn btn-success"> Close </button>
          <div className="title">
       
          </div>
          <div className="body">
          
          
          <ChangeUsernameForm></ChangeUsernameForm>

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
  
  export default ModalTwo;