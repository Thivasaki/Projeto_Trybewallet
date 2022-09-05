export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_EXCHANGERATE = 'ADD_EXCHANGERATE';

export function addLoginAction(payload) {
  return {
    type: ADD_LOGIN,
    payload,
  };
}

export const getCurrencyAPI = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  const response = await fetch(url);
  const data = await response.json();
  const currencies = Object.keys(data).filter((e) => e !== 'USDT');

  dispatch({
    type: ADD_CURRENCIES,
    payload: currencies,
  });
};

export const getExchangeRatesAPI = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  const response = await fetch(url);
  const data = await response.json();
  delete data.USDT;

  dispatch({
    type: ADD_EXCHANGERATE,
    payload: data,
  });
};

export function addExpensesAction(payload) {
  return {
    type: ADD_EXPENSES,
    payload,
  };
}
