import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      waiting: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.LoadFavorites();
  }

  componentDidUpdate() {

  }

  LoadFavorites = () => {
    const { favSongs, obj } = this.props;
    const song = favSongs;
    const checkFav = song.some((item) => item.trackId === obj.trackId);
    this.setState({
      isFavorite: checkFav,
    });
  };

  handleCheckbox = async () => {
    const { isFavorite } = this.state;
    const { getFavorites } = this.props;
    this.setState({
      waiting: true,
    });
    if (isFavorite) {
      const { obj } = this.props;
      await removeSong(obj);
      this.setState({
        waiting: false,
        isFavorite: false,
      });
      getFavorites();
    } else {
      const { obj } = this.props;
      await addSong(obj);
      this.setState({
        waiting: false,
        isFavorite: true,
      });
    }

    if (getFavorites) {
      getFavorites();
    }
  };

  removeFavorite = async () => {
    await removeSong();
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { waiting, isFavorite } = this.state;
    return (
      <div>
        {waiting ? (
          <Loading />
        ) : (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                name="favorite"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ isFavorite }
                onChange={ this.handleCheckbox }
              />

            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  obj: PropTypes.objectOf(PropTypes.any),
  favSongs: PropTypes.arrayOf(PropTypes.any),
  getFavorites: PropTypes.func,
};

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
  trackId: 0,
  obj: { '': '' },
  favSongs: [],
  getFavorites: () => 'oi',
};

export default MusicCard;
