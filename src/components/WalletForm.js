import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyAPI, addExpensesAction, getExchangeRatesAPI } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencyAPI());
  }

  handleValue = ({ target }) => {
    const { value } = target;
    const { id } = target;
    this.setState({ [id]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { id, value, description, currency, method,
      tag } = this.state;
    await dispatch(getExchangeRatesAPI());
    const { exchangeRates } = this.props;
    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(addExpensesAction(expenses));
    const idPlus = id + 1;
    this.setState({
      id: idPlus,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <form>
        <input
          type="number"
          data-testid="value-input"
          id="value"
          step="any"
          value={ value }
          onChange={ (event) => this.handleValue(event) }
        />

        <input
          type="text"
          data-testid="description-input"
          id="description"
          value={ description }
          onChange={ (event) => this.handleValue(event) }
        />

        <select
          name="select-currency"
          data-testid="currency-input"
          id="currency"
          value={ currency }
          onChange={ (event) => this.handleValue(event) }
        >
          {currencies.map((curr) => (
            <option key={ curr } value={ curr }>{curr}</option>
          ))}
        </select>

        <select
          name="select-method"
          data-testid="method-input"
          id="method"
          value={ method }
          onChange={ (event) => this.handleValue(event) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          name="select-tag"
          data-testid="tag-input"
          id="tag"
          value={ tag }
          onChange={ (event) => this.handleValue(event) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar Despesas
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.shape(PropTypes.shape.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
