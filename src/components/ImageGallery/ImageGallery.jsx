import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';
import { Modal } from '../Modal/Modal';
import { LoadMoreButton } from '../Button/Button';
import { fetchImages } from '../api';

export function ImageGallery({ imageQuery }) {
  const [imagesData, setImagesData] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [bigImg, setBigImg] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setImagesData(null);
    setIsLoad(true);
    setStatus('pending');

    fetchImages(imageQuery, 1)
      .then(data => {
        setIsLoad(false);
        setImagesData(data.hits);
        setStatus('resolved');
        setPage(1);
      })
      .catch(error => setError({ error }));
  }, [imageQuery]);

  useEffect(() => {
    if (page !== 1) {
      // this.setState({ isLoad: true,status:Status.PENDING});
      setIsLoad(true);
      fetchImages(imageQuery, page)
        .then(data => {
          setImagesData(pS => [...pS, ...data.hits]);
          setStatus('resolved');
          setIsLoad(false);
        })
        .catch(error => setError({ error }));
    }
  }, [page]);

  const handleClickImg = url => {
    setBigImg(url);
    setOpenModal(true);
  };

  const clickLoadMore = page => {
    setPage(page);
  };

  const toggleOpenModal = () => {
    setOpenModal(openModal => !openModal);
  };

  if (status === 'idle') {
    return;
  }
  if (status === 'pending') {
    // return <Loader />
  }
  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }
  if (status === 'resolved') {
    return (
      <>
        <ImageGalleryStyle className="gallery">
          <ImageGalleryItem data={imagesData} imgUrl={handleClickImg} />
        </ImageGalleryStyle>
        <LoadMoreButton onClick={clickLoadMore} page={page} />
        {isLoad && <Loader />}
        {/* <Loader /> */}
        {openModal && <Modal url={bigImg} onClose={toggleOpenModal} />}
      </>
    );
  }
}

ImageGallery.protoTypes = {
  imageQuery: PropTypes.string.isRequired,
};
