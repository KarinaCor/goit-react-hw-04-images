import { useState } from 'react';
import * as SC from '../ImageGalleryItem/ImageGalleryItem.styled';

import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({toogleModal,webformatURL,tags,largeImageURL}) => {
  const [isModalOpen, setisModalOpen] = useState(false);

  toogleModal = () => {
    setisModalOpen(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  return (
    <>
      <SC.Item onClick={toogleModal}>
        <SC.Img src={webformatURL} alt={tags} />
      </SC.Item>
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          alt={tags}
          onCloseModal={toogleModal}
        />
      )}
    </>
  );
};
