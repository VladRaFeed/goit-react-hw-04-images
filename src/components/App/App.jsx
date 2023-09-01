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

  //   componentDidMount() {
  //     const { request, page } = this.state;
  //     this.fetchImg(request, page);
  //   }

  useEffect(() => {
    fetchImg(request, page);
  }, [request, page]);

  //   componentDidUpdate(prevProps, prevState) {
  //     const { request, page } = this.state;
  //     if (prevState.request !== request || prevState.page !== page) {
  //       this.fetchImg(request, page);
  //     }
  //   }

  // useEffect(
  //   (prevRequest, prevPage) => {
  //     if (prevRequest !== request || prevPage !== page) {
  //       fetchImg(request, page);
  //     }
  //   },
  //   [request, page]
  // );

  const handleFormSubmit = request => {
    setRequest(request);
    setPage(1);
    setImages([]);
  };

  //   onLoadMore = () => {
  //     this.setState(prevState => ({
  //       page: prevState.page + 1,
  //     }));
  //   };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  //   fetchImg = async (request, page) => {
  //     if (!request) {
  //       return;
  //     }
  //     try {
  //       this.setState({ loading: true });
  //       const { hits } = await fetchData(request, page);

  //       if (hits.length === 0) {
  //         return alert('Sorry, images not found...');
  //       }
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...hits],
  //       }));
  //     } catch (error) {
  //       console.log('Error ;(', error);
  //     } finally {
  //       this.setState({ loading: false });
  //     }
  //   };

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

  //   onOpenModal = url => {
  //     this.setState(({ modal }) => ({ modal: !modal, largeImage: url }));
  //     window.addEventListener('keydown', this.handleKeyDown);
  //   };

  const onOpenModal = url => {
    setModal(!modal);
    setLargeImage(url);
    window.addEventListener('keydown', handleKeyDown);
  };

  //   onModalClose = () => {
  //     this.setState(({ modal }) => ({ modal: !modal, largeImage: null }));
  //     window.removeEventListener('keydown', this.handleKeyDown);
  //   };

  const onModalClose = () => {
    setModal(!modal);
    setLargeImage(null);
    window.removeEventListener('keydown', handleKeyDown);
  };

  //   handleKeyDown = e => {
  //     if (e.code === 'Escape') {
  //       this.onModalClose();
  //     }
  //   };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };

  //   handleBackdropCLick = e => {
  //     if (e.currentTarget === e.target) {
  //       this.onModalClose();
  //     }
  //   };

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

// export default class App extends Component {
//   state = {
//     request: 'cat',
//     images: [],
//     largeImage: null,
//     page: 1,
//     loading: false,
//     modal: false,
//   };

//   componentDidMount() {
//     const { request, page } = this.state;
//     this.fetchImg(request, page);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { request, page } = this.state;
//     if (prevState.request !== request || prevState.page !== page) {
//       this.fetchImg(request, page);
//     }
//   }

//   handleFormSubmit = request => {
//     this.setState({ images: [], request, page: 1 });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   fetchImg = async (request, page) => {
//     if (!request) {
//       return;
//     }
//     try {
//       this.setState({ loading: true });
//       const { hits } = await fetchData(request, page);

//       if (hits.length === 0) {
//         return alert('Sorry, images not found...');
//       }
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//       }));
//     } catch (error) {
//       console.log('Error ;(', error);
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   onOpenModal = url => {
//     this.setState(({ modal }) => ({ modal: !modal, largeImage: url }));
//     window.addEventListener('keydown', this.handleKeyDown);
//   };

//   onModalClose = () => {
//     this.setState(({ modal }) => ({ modal: !modal, largeImage: null }));
//     window.removeEventListener('keydown', this.handleKeyDown);
//   };

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.onModalClose();
//     }
//   };

//   handleBackdropCLick = e => {
//     if (e.currentTarget === e.target) {
//       this.onModalClose();
//     }
//   };

//   render() {
//     const { loading, images, modal, largeImage } = this.state;

//     return (
//       <div className={css.app}>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {loading && <Loader />}
//         <ImageGallery images={images} modalOpen={this.onOpenModal} />
//         {images.length > 0 ? (
//           <Button onLoadMore={this.onLoadMore} />
//         ) : (
//           <h2>please, type your request</h2>
//         )}
//         {modal && (
//           <Modal
//             onCLick={this.handleBackdropCLick}
//             largeImageUrl={largeImage}
//           />
//         )}
//       </div>
//     );
//   }
// }
