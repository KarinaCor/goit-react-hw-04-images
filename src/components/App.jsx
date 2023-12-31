import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsApiService from './helpers/pixabay-api';

import { Button } from './Button/Button';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import * as SC from '../components/App.styled';
import { useEffect, useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';

const postApiService = new PostsApiService();

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchGalleryItems = (query, page) => {
      setLoading(true);
     

      postApiService.query = query;
      postApiService.page = page;

      postApiService
      .fetchPost()
      .then(data => {
        const newData = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
       

        setGalleryItems(prevGalleryItems => [
         ...prevGalleryItems, 
         ...newData,
        ]);
        setTotalHits(data.totalHits)

        if (!data.totalHits) {
          setError(true);

          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${data.totalHits} images.`);
        }

      })
      .catch(error => {
        toast.error(error.message);
        setError(true);
        setGalleryItems([]);
        setTotalHits(0);
        setGalleryPage(1);
      })
      .finally(() => setLoading(false));
  };

  fetchGalleryItems(searchQuery, galleryPage);
},[searchQuery, galleryPage]);
    

const handleFormSubmit = searchQuery => {
  setSearchQuery('');
  setGalleryItems([]);
  setTotalHits(0);
  setGalleryPage(1);
  setError(false);

  setSearchQuery(searchQuery);
};

  const onLoadMore = () => {
    setGalleryPage(prevGalleryPage => prevGalleryPage + 1);
  };

  return (
    <SC.AppContent>
      <SearchBar onSubmit={handleFormSubmit} />
      {error && <h2>Please, enter search word!</h2>}
      {!error && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {0 < galleryItems.length && galleryItems.length < totalHits && (
        <Button onClick={onLoadMore} />
      )}

      <ToastContainer autoClose={3000} theme="dark" />
    </SC.AppContent>
  );
};
