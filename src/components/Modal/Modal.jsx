import { useEffect } from 'react';
import * as SC from '../Modal/Modal.styled';


export const Modal = ({largeImageURL,alt,onCloseModal}) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onCloseModal]);

  const handleOverlayClick = event => {
    if (event.target === this.event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <SC.Overlay onClick={handleOverlayClick}>
      <SC.Modal>
        <SC.Img src={largeImageURL} alt={alt} />
      </SC.Modal>
    </SC.Overlay>
  );
};
