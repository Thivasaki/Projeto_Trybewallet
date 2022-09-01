export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export function addLoginAction(payload) {
  return {
    type: ADD_LOGIN,
    payload,
  };
}

export const getCurrencyAPI = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  const response = await fetch(url);
  // const { USD, CAD, GBP, ARS, BTC, LTC, EUR, JPY, CHF,
  //   AUD, CNY, ILS, ETH, XRP, DOGE } = await response.json();
  const data = await response.json();
  const currencies = Object.keys(data).filter((e) => e !== 'USDT');

  dispatch({
    type: ADD_CURRENCIES,
    // payload: [USD.code, CAD.code, GBP.code, ARS.code, BTC.code, LTC.code,
    //   EUR.code, JPY.code, CHF.code, AUD.code, CNY.code, ILS.code,
    //   ETH.code, XRP.code, DOGE.code],
    payload: currencies,
  });
};
