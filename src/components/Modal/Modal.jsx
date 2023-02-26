import PropTypes from 'prop-types';
import { ModalStyle } from './Modal.styled';
import { createPortal } from 'react-dom';
import {useEffect} from 'react';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ url, onClose }) {
useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
      return window.removeEventListener('keydown', handleKeyDown);
    }
  }
  return ()=>{
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [onClose])

    // window.addEventListener('keydown', handleKeyDown);
   
  
const handleBackDropeClick = e => {
  if (e.currentTarget === e.target) {
   return onClose();
     
  }
};
 

  return createPortal(
    <ModalStyle className="overlay" onClick={handleBackDropeClick}>
      <div className="modal">
        <img src={url} alt="" />
      </div>
    </ModalStyle>,
    modalRoot
  );
}

Modal.protoTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
