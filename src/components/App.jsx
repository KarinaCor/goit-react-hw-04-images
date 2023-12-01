import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsApiService from './helpers/pixabay-api';

import { Button } from './Button/Button';
import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import * as SC from '../components/App.styled';
import { useEffect, useState } from 'react';

const postApiService = new PostsApiService();

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState(null);
  const [galleryPage, setGalleryPage] = useState(1);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    if (prevQuery !== nextQuery) {
      setState({ galleryPage: 1, galleryItems: [], isButtonShow: false });
      if (nextPage === 1) {
        fetchGalleryItems(nextQuery, nextPage);
      }
    } else if (prevPage !== nextPage) {
      fetchGalleryItems(nextQuery, nextPage);
    }
    const fetchGalleryItems = (nextQuery, nextPage) => {
      setLoading(true);
      setError(false);

      postApiService.query = nextQuery;
      postApiService.page = nextPage;

      postApiService.fetchPost().then(data => {
        postApiService.hits = data.totalHits;

        const newData = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        const currentData = [...galleryItems, ...newData];

        setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...newData],
        }));

        if (!data.totalHits) {
          setLoading(false);
          setError(true);
          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (currentData.length >= data.totalHits) {
          setLoading(false);
          setIsButtonShow(false);
          setError(false);

          return;
        }

        if (nextPage === 1) {
          toast.success(`Hooray! We found ${postApiService.hits} images.`);
        }

        setLoading(false);
        setIsButtonShow(true);
        setError(false);
      });
    };
  });

  const handleFormSubmit = searchQuery => {
    setGalleryPage(1);
    setSearchQuery(searchQuery);
    setGalleryItems([]);
  };

  const onLoadMore = () => {
    setGalleryPage(prevState => prevState + 1);
  };

  return (
    <SC.AppContent>
      <SearchBar onSubmit={handleFormSubmit} />
      {error && <h2>Please, enter search word!</h2>}
      {!error && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {isButtonShow && <Button onLoadMore={onLoadMore} />}

      <ToastContainer autoClose={3000} theme="dark" />
    </SC.AppContent>
  );
};
