import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLoginAction } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disableButton: false,
    };
  }

  validation = () => {
    const { password, email } = this.state;
    const minNumbPassword = 6;
    const emailValidation = email.match(/@email.com/i) !== null;
    const Validation = password.length >= minNumbPassword
    && emailValidation;
    this.setState({ disableButton: Validation });
  };

  handleValue = ({ target }) => {
    const { value } = target;
    const { id } = target;
    this.setState({ [id]: value }, this.validation);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addLoginAction(email));
    history.push('/carteira');
  };

  render() {
    const { disableButton } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ (event) => this.handleValue(event) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            data-testid="password-input"
            onChange={ (event) => this.handleValue(event) }
          />
        </label>
        <button
          type="submit"
          disabled={ !disableButton }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
