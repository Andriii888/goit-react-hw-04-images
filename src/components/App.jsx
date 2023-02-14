import { useState } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyle } from './AppStyle.styled';

export const App = () => {
  const [imageQuery, setImageQuery] = useState('');

  const handleForSubmit = imageQueryData => {
    setImageQuery(imageQueryData);
  };

  return (
    <AppStyle>
      <SearchBar onSubmit={handleForSubmit} />
      <ImageGallery imageQuery={imageQuery} />
    </AppStyle>
  );
};
