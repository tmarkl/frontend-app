import { combineReducers } from "redux";
import app from "./app";

const appReducer = combineReducers({
  app
});

export default function(state, action) {
  return appReducer(state, action);
}
