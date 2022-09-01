export const ADD_LOGIN = 'ADD_LOGIN';

export function addLoginAction(payload) {
  return {
    type: ADD_LOGIN,
    payload,
  };
}
