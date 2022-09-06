import { ADD_CURRENCIES, ADD_EXPENSES,
  ADD_EXCHANGERATE, DELETE_EXPENSES, START_EDIT, IDTOEDITOR,
  END_EDIT } from '../actions';

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
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: [...action.payload],
    };

  case START_EDIT:
    return {
      ...state,
      editor: true,
    };

  case IDTOEDITOR:
    return {
      ...state,
      idToEdit: Number(action.payload),
    };

  case END_EDIT:
    return {
      ...state,
      expenses: [...action.payload],
      editor: false,
      idToEdit: 0,
    };

  default:
    return state;
  }
};

export default wallet;
