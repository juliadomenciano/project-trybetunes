import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedName: '',
      /* redirect: false, */
      buttonValidation: true,
      waiting: false,
      albumsAndArtists: [],
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
    const data = await searchAlbumsAPI(searchedName); console.log(data);
    this.setState({
      artistName: searchedName,
      searchedName: '',
      waiting: false,
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
        { waiting ? <Loading />
          : (
            albumsAndArtists.length !== 0
              ? <div>
                <h2>
                  {' '}
                  Resultado de álbuns de:
                  {' '}
                  { artistName }
                  {' '}
                </h2>
                {albumsAndArtists.map((item, index) => (
                  <div key={ index }>
                    <p>{item.artistName}</p>
                    <p>{item.collectionName}</p>
                    <Link
                      to={ `/album/${item.collectionId}` }
                      data-testid={ `link-to-album-${item.collectionId}` }
                    >
                      Ir para album
                    </Link>
                  </div>))}
              </div>
              : <h2> Nenhum álbum foi encontrado </h2>
          )}
      </div>
    );
  }
}

export default Search;
