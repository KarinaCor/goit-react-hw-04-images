import { useState } from 'react';
import * as SC from '../ImageGalleryItem/ImageGalleryItem.styled';

import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({
  galleryItem: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toogleModal = () => {
    setIsModalOpen(isModalOpen => !isModalOpen);
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
