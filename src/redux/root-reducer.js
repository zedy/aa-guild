// libs
import { combineReducers } from "redux";

// reducers
import userReducer from './user/user.reducer';
import dmReducer from './dm/dm.reducer';

// TODO => redux-persist

const rootReducer = combineReducers({
  user: userReducer,
  dms: dmReducer
})

export default rootReducer;