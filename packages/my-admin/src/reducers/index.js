import { combineReducers } from "redux";
import app from "./app";
import account from "./account";

const appReducer = combineReducers({
  app,
  account
});

export default function(state, action) {
  return appReducer(state, action);
}
