import React from 'react';
import { Children } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background:'white',
    width:'40%',
    height:'60%'
  },
  overlay:{
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgb(0,0,0,0.5)'
  }
};

Modal.setAppElement('#root');

export function ModalView({children,setModalOpen,modalOpen}){


function afterOpenModal() {
}   

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
        
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
     {children}
      </Modal>
    </div>
  );
}

export default ModalView;