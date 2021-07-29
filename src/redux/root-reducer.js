// libs
import { combineReducers } from "redux";

// reducers
import userReducer from './user/user.reducer';

// TODO => redux-persist

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer;