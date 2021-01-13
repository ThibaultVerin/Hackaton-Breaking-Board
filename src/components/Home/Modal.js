import React from 'react';
import './Modal.scss';

const Modal = ({ showModal, children, hideModal }) => {
  return (
    <div>
      {showModal ? (
        /* eslint-disable */
        <div role='button' className='modalBackground' onClick={hideModal}>
          <div className='modalContainer'>{children}</div>
        </div>
      ) : /* eslint-enable */
      null}
    </div>
  );
};

export default Modal;
