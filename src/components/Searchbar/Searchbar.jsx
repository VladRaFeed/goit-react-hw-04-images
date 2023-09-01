import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

export default class Searchbar extends Component {
  state = {
    request: '',
  };

  handleNameChange = e => {
    this.setState({ request: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.request.trim() === '') {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
    }
    this.props.onSubmit(this.state.request);
    this.setState({ request: '' });
  };

  render() {
    const { request } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleSubmit}>
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
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
