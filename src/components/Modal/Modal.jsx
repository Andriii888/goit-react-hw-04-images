import PropTypes from 'prop-types';
import { ModalStyle } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ url, onClose }) {
  window.addEventListener('keydown', handleKeyDown);

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      console.log('esc');
      onClose();
      return window.removeEventListener('keydown', handleKeyDown);
    }
  }

  const handleBackDropeClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
      return window.removeEventListener('keydown', handleKeyDown);
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
