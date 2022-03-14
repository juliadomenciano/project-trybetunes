import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',

    };
  }

  componentDidMount() {
    this.handleApi();
  }

  handleApi = async () => {
    this.setState({

    });
    const userP = await getUser();
    console.log(userP);
    this.setState({

      name: userP.name,
      email: userP.email,
      description: userP.description,
      image: userP.image,
    });
  }

  render() {
    const { name, email, image, description } = this.state;
    return (

      <div data-testid="page-profile">
        <Header />

        <div>
          <img
            data-testid="profile-image"
            src={ image }
            alt="imagem de perfil"
          />
          <p>

            {name}
          </p>
          <p>

            {' '}
            {email}
          </p>
          <p>

            {' '}
            {description}
          </p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>

    );
  }
}

export default Profile;
