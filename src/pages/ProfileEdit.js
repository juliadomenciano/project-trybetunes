import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      buttonValidation: true,
      redirect: false,

    };
  }

  async componentDidMount() {
    await this.handleApi();
    this.handleButton();
  }

  handleApi = async () => {
    const userP = await getUser();
    this.setState({

      name: userP.name,
      email: userP.email,
      description: userP.description,
      image: userP.image,
    });
  }

  handlechange = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.name]: value,
    }, this.handleButton());
  }

  handleClick = () => {
    const {
      name,
      email,
      image,
      description } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
    };
    updateUser(obj);
    this.setState({
      redirect: true,
    });
  }

  handleButton = () => {
    const {
      name,
      email,
      image,
      description } = this.state;
    if (name && email && image && description) {
      this.setState({
        buttonValidation: false,
      });
    }
  }

  render() {
    const { name,
      email,
      image,
      description,
      buttonValidation,
      redirect,
    } = this.state;
    return (

      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              value={ name }
              onChange={ this.handlechange }
              placeholder={ name }
              data-testid="edit-input-name"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              value={ email }
              onChange={ this.handlechange }
              placeholder={ email }
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              value={ description }
              onChange={ this.handlechange }
              name="description"
              placeholder={ description }
              data-testid="edit-input-description"
            />
          </label>
          <label htmlFor="image">
            <input
              name="image"
              value={ image }
              onChange={ this.handlechange }
              placeholder={ image }
              data-testid="edit-input-image"
            />
          </label>

          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ buttonValidation }
            onClick={ this.handleClick }
          >
            Editar perfil

          </button>
          {redirect && <Redirect to="/profile" />}
        </form>

      </div>

    );
  }
}

export default ProfileEdit;
