import { ADD_CURRENCIES, ADD_EXPENSES, ADD_EXCHANGERATE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  exchangeRates: {},
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXCHANGERATE:
    return {
      ...state,
      exchangeRates: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
