import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      waiting: false,
      isFavorite: false,
    };
  }

  handleCheckbox = async () => {
    this.setState({
      waiting: true,
    });
    const { obj } = this.props;
    await addSong(obj);
    this.setState({
      waiting: false,
      isFavorite: true,
    });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { waiting, isFavorite } = this.state;
    return (

      <div>
        {waiting
          ? <Loading />
          : (
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
            </div>)}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  obj: PropTypes.objectOf(PropTypes.any),
};

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
  trackId: 0,
  obj: { '': '' },
};

export default MusicCard;
