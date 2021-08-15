// libs
import { combineReducers } from "redux";
import {reducer as toastrReducer} from 'react-redux-toastr'

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
  dnd: dndReducer,
  toastr: toastrReducer
})

export default rootReducer;