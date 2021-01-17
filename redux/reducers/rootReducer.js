import { combineReducers } from "redux";
import miscReducer from "./miscReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
  miscReducer,
});

export default rootReducer;
