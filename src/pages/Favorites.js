import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favSongs: [],
      waiting: false,
    };
  }

  async componentDidMount() {
    await this.getFavorites();
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
  };

  render() {
    const { favSongs, waiting } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />

        {!waiting
        && favSongs.map((item, index) => (
          <MusicCard
            key={ index }
            previewUrl={ item.previewUrl }
            trackName={ item.trackName }
            trackId={ item.trackId }
            obj={ item }
            favSongs={ favSongs }
            getFavorites={ this.getFavorites }

          />
        ))}

      </div>
    );
  }
}

export default Favorites;
