import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      redirect: false,
      buttonValidation: true,
    };
  }

  handlechange = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.name]: value,
    }, this.handleButton);
  }

  handleButton = () => {
    const { loginName } = this.state;
    const num = 3;
    if (loginName.length >= num) {
      this.setState({
        buttonValidation: false,
      });
    }
  }

  handleClick = () => {
    const { loginName } = this.state;
    createUser({ name: loginName });
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { loginName, redirect, buttonValidation } = this.state;
    return (

      <div data-testid="page-login">
        <h1>Login!</h1>

        <label htmlFor="name">
          <input
            type="text"
            data-testid="login-name-input"
            name="loginName"
            value={ loginName }
            onChange={ this.handlechange }
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ buttonValidation }
          onClick={ this.handleClick }
        >
          Entrar
        </button>

        {redirect && <Redirect to="/search" />}

      </div>

    );
  }
}

export default Login;
