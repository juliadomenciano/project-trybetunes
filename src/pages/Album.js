import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      artistName: '',
      collectionName: '',
      favSongs: [],
      waiting: false,
    };
  }

  async componentDidMount() {
    await this.handleApi();
    await this.getFavorites();
  }

  handleApi = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await getMusics(id);
    console.log(id);
    this.setState({
      songs: [...data],
      artistName: data[0].artistName,
      collectionName: data[0].collectionName,
    });
  }

  getFavorites = async () => {
    this.setState({
      waiting: true,
    });
    const favs = await getFavoriteSongs();
    this.setState({
      favSongs: [...favs],
      waiting: false,
    });
  }

  render() {
    const { songs, artistName, collectionName, waiting, favSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {waiting ? <Loading />
          : (
            <div>
              <div>
                <h2 data-testid="artist-name">{artistName}</h2>
                <h3 data-testid="album-name">{collectionName}</h3>
              </div>
              <div>
                {songs.filter((item) => item.trackName).map((item, index) => (<MusicCard
                  key={ index }
                  previewUrl={ item.previewUrl }
                  trackName={ item.trackName }
                  trackId={ item.trackId }
                  obj={ item }
                  favSongs={ favSongs }
                />))}
              </div>
            </div>
          )}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
