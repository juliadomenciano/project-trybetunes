import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
    };
  }

  handlechange = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.name]: value,
    });
    console.log(createUser);
  }

  render() {
    const { loginName } = this.state;
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
          onClick={ () => createUser({ name: loginName }) }
        >
          Entrar

        </button>

      </div>

    );
  }
}

export default Login;
