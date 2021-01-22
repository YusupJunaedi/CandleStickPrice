import { combineReducers } from "redux";
import AppReducer from "./AppReducer";

const indexReducer = combineReducers({
  API: AppReducer
});

export default indexReducer;
