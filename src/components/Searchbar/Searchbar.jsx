import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

export default function Searchbar({ onSubmit }) {
  const [request, setRequest] = useState('');

  const handleNameChange = e => {
    setRequest(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (request.trim() === '') {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
    }
    onSubmit(request);
    setRequest('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchform_button}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={css.searchform_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={request}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
