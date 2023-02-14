import PropTypes from 'prop-types';
import { ImageGalleryItemStyle } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ data, imgUrl }) {
  const handleClickBigImg = e => {
    imgUrl(e.target.align);
  };

  return data.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <ImageGalleryItemStyle key={id} className="gallery-item">
        <img
          src={webformatURL}
          alt={tags}
          align={largeImageURL}
          onClick={handleClickBigImg}
        />
      </ImageGalleryItemStyle>
    );
  });
}
ImageGalleryItem.protoTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  imgUrl: PropTypes.string.isRequired,
};
