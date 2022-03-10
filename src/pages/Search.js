import React from 'react';
/* import { Link } from 'react-router-dom'; */
import Header from '../components/Header';
import ShowAlbum from '../components/ShowAlbum';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedName: '',
      buttonValidation: true,
      waiting: false,
      albumsAndArtists: [],
      click: false,
    };
  }

  handlechange = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.name]: value,
    }, this.handleButton);
  }

  handleButton = () => {
    const { searchedName } = this.state;
    if (searchedName.length >= 2) {
      this.setState({
        buttonValidation: false,
      });
    }
  }

  handleClick = async () => {
    this.setState({
      waiting: true,
    });
    const { searchedName } = this.state;
    const data = await searchAlbumsAPI(searchedName);
    this.setState({
      artistName: searchedName,
      searchedName: '',
      waiting: false,
      click: true,
      albumsAndArtists: [...data],
    });
  }

  render() {
    const {
      searchedName,
      buttonValidation,
      waiting,
      albumsAndArtists,
      artistName,
      click,
    } = this.state;
    return (

      <div data-testid="page-search">
        <Header />

        <label htmlFor="searchedName">
          <input
            type="text"
            data-testid="search-artist-input"
            name="searchedName"
            value={ searchedName }
            onChange={ this.handlechange }
          />
        </label>

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonValidation }
          onClick={ () => { this.handleClick(); } }
        >
          Pesquisar
        </button>
        { waiting === true
          ? <Loading />
          : (
            <ShowAlbum
              albumsAndArtists={ albumsAndArtists }
              artistName={ artistName }
              click={ click }
            />) }
        {
          click && albumsAndArtists.length === 0
              && <h2> Nenhum álbum foi encontrado </h2>
        }

      </div>
    );
  }
}

export default Search;
