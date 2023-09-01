import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

// const ImageGallery = ({ name }) => {
//   return (
//     <ul className="gallery">
//       {images.map(image => (
//         <ImageGalleryItem
//           id={image.id}
//           smallImage={image.webformatURL}
//           largeImage={image.largeImageURL}
//         />
//       ))}
//     </ul>
//   );
// };

const ImageGallery = ({ images, modalOpen }) => {
  // console.log(images);
  return (
    <ul className={css.imagegallery}>
      {images.map(image => (
        <ImageGalleryItem
          callback={() => modalOpen(image.largeImageURL)}
          id={image.id}
          smallImage={image.webformatURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  modalOpen: PropTypes.func,
};
