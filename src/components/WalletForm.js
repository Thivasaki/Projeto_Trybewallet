import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencyAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencyAPI());
  }

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <input type="number" data-testid="value-input" />

        <input type="text" data-testid="description-input" />

        <select
          name="select-currency"
          data-testid="currency-input"
        >
          {currencies.map((currency) => (
            <option key={ currency } value={ currency }>{currency}</option>
          ))}
        </select>

        <select
          name="select-method"
          data-testid="method-input"
        >
          <option value="banknote">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
        </select>

        <select
          name="select-tag"
          data-testid="tag-input"
        >
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
