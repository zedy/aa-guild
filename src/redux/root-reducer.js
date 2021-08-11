// libs
import { combineReducers } from "redux";

// reducers
import userReducer from './user/user.reducer';
import dmReducer from './dm/dm.reducer';
import eventsReducer from "./events/events.reducer";
import dndReducer from './dnd/dnd.reducer';

// TODO => redux-persist

const rootReducer = combineReducers({
  user: userReducer,
  dms: dmReducer,
  events: eventsReducer,
  dnd: dndReducer
})

export default rootReducer;