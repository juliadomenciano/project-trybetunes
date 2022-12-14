import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ShowAlbum extends React.Component {
  render() {
    const { albumsAndArtists, artistName, click } = this.props;
    return (
      <div>
        {
          click && albumsAndArtists.length > 0

            && (
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
  albumsAndArtists: PropTypes.arrayOf(PropTypes.any),
  artistName: PropTypes.string,
  click: PropTypes.bool,
};

ShowAlbum.defaultProps = {
  albumsAndArtists: [],
  artistName: '',
  click: false,
};

export default ShowAlbum;
