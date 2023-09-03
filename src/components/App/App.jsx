import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import fetchData from 'servises/imagesApi';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'components/Loader/Loader';
import css from './App.module.css';

export default function App() {
  const [request, setRequest] = useState('cat');
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchImg(request, page);
  }, [request, page]);

  const handleFormSubmit = request => {
    setRequest(request);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const fetchImg = async (request, page) => {
    if (!request) {
      return;
    }
    try {
      setLoading(true);
      const { hits } = await fetchData(request, page);

      if (hits.length === 0) {
        return alert('Sorry, images not found...');
      }
      setImages(prevImages => [...prevImages, ...hits]);
    } catch (error) {
      console.warn('Error ;(', error);
    } finally {
      setLoading(false);
    }
  };

  const onOpenModal = url => {
    setModal(!modal);
    setLargeImage(url);
    window.addEventListener('keydown', handleKeyDown);
  };

  const onModalClose = () => {
    setModal(!modal);
    setLargeImage(null);
    window.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };
  const handleBackdropCLick = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      <ImageGallery images={images} modalOpen={onOpenModal} />
      {images.length > 0 ? (
        <Button onLoadMore={onLoadMore} />
      ) : (
        <h2>please, type your request</h2>
      )}
      {modal && (
        <Modal onCLick={handleBackdropCLick} largeImageUrl={largeImage} />
      )}
    </div>
  );
}
