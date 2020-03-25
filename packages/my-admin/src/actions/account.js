export function loginAccount() {
  return {
    type: "LOGIN_ACCOUNT"
  };
}

export function loginAccountCompletion(error) {
  return {
    type: "LOGIN_ACCOUNT_COMPLETION",
    error
  };
}

export function clearAccountLogin() {
  return {
    type: "CLEAR_ACCOUNT_LOGIN"
  };
}

export function inputForAccountLogin(input) {
  return {
    type: "INPUT_FOR_ACCOUNT_LOGIN",
    input
  };
}

export function logoutAccount() {
  return {
    type: "LOGOUT_ACCOUNT"
  };
}

export function logoutAccountCompletion(error) {
  return {
    type: "LOGOUT_ACCOUNT_COMPLETION",
    error
  };
}
