import PropTypes from 'prop-types';
import { useState } from 'react';
import { SearchBarStyle } from './SearchBar.styled';

export function SearchBar({ onSubmit }) {
  const [imageQuery, setImageQuery] = useState('');

  const handleQueryChange = e => {
    e.preventDefault();
    setImageQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(imageQuery);
    setImageQuery('');
  };

  return (
    <SearchBarStyle className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          name="imageQuery"
          value={imageQuery}
          onChange={handleQueryChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </SearchBarStyle>
  );
}
SearchBar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
};
