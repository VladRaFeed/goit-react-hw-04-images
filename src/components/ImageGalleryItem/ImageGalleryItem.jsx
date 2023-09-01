import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, smallImage, callback }) => {
  return (
    <li onClick={callback} className={css.imagegalleryitem} key={id}>
      <img src={smallImage} alt="" className={css.imagegalleryitem_image} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImage: PropTypes.string.isRequired,
  callback: PropTypes.func,
};
