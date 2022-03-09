import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ShowAlbum extends React.Component {
  render() {
    console.log(this);
    const { albumsAndArtists, artistName } = this.props;
    return (
      <div>
        {
          albumsAndArtists.length === 0

            ? <h2> Nenhum álbum fotrado </h2>

            : (
              <div>
                <h2>
                  Resultado de álbuns de:
                  {' '}
                  { artistName }
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
              </div>)

        }
      </div>

    );
  }
}

ShowAlbum.propTypes = {
  albumsAndArtists: PropTypes.arrayOf.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default ShowAlbum;
