import { combineReducers } from "redux";

const loginInitialState = {
  saveStatus: 0,
  data: null,
  input: {
    username: "",
    password: ""
  }
};

const logoutInitialState = {
  saveStatus: 0
};

function loginReducer(state = loginInitialState, action) {
  switch (action.type) {
    case "LOGIN_ACCOUNT": {
      return {
        ...state,
        saveStatus: 1
      };
    }

    case "LOGIN_ACCOUNT_COMPLETION": {
      if (action.error) {
        return {
          ...state,
          saveStatus: 0
        };
      }

      return {
        ...state,
        saveStatus: 2,
        data: action.data
      };
    }

    case "CLEAR_ACCOUNT_LOGIN": {
      return loginInitialState;
    }

    case "INPUT_FOR_ACCOUNT_LOGIN": {
      return {
        ...state,
        input: {
          ...state.input,
          ...action.input
        }
      };
    }

    default:
      return state;
  }
}

function logoutReducer(state = logoutInitialState, action) {
  switch (action.type) {
    case "LOGOUT_ACCOUNT": {
      return {
        ...state,
        saveStatus: 1
      };
    }

    case "LOGOUT_ACCOUNT_COMPLETION": {
      return {
        ...state,
        saveStatus: action.error ? 0 : 2
      };
    }

    default:
      return state;
  }
}

export default combineReducers({
  login: loginReducer,
  logout: logoutReducer
});
