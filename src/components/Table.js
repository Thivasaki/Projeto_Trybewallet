import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpensesAction } from '../redux/actions';

class Table extends Component {
  handleClick = (event) => {
    const { expenses, dispatch } = this.props;
    const { id } = event.target;
    const deleteExpenses = expenses.filter((e) => e.id !== Number(id));
    dispatch(deleteExpensesAction(deleteExpenses));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length !== 0 && expenses.map((e) => {
            const currencyExRates = e.exchangeRates[e.currency];
            const convertedValue = Math
              .round(e.exchangeRates[e.currency].ask * e.value * 100) / 100;
            const value = Number(e.value).toFixed(2);
            return (
              <tr key={ e.id }>
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ value }</td>
                <td>{ currencyExRates.name }</td>
                <td>{ Math.round(currencyExRates.ask * 100) / 100 }</td>
                <td>{ convertedValue }</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ e.id }
                    onClick={ (event) => this.handleClick(event) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Table);
