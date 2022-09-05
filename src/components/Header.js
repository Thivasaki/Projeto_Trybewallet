import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  handleValue = () => {
    const { expenses } = this.props;
    const curry = expenses.map((e) => e.currency);
    const exRates = curry.map((e, i) => expenses[i].exchangeRates[e].ask);
    const value = expenses.map((e) => e.value);
    const finalValue = exRates.map((e, i) => Number(e) * Number(value[i]))
      .reduce((acc, cur) => acc + cur);
    return Math.round(finalValue * 100) / 100;
  };

  render() {
    const { user, expenses } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          {user.email}
        </span>

        <span data-testid="total-field">
          { expenses.length === 0 ? 0
            : (this.handleValue())}
        </span>

        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
