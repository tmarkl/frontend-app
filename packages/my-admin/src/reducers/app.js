import { combineReducers } from "redux";

function launchStatusReducer(state = 0, action) {
  switch (action.type) {
    case "LAUNCH": {
      return 1;
    }

    case "LAUNCH_COMPLETION": {
      return action.error ? 0 : 2;
    }

    default:
      return state;
  }
}

export default combineReducers({
  launchStatus: launchStatusReducer
});
