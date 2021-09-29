// libs
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as toastrReducer } from 'react-redux-toastr';

// reducers
import userReducer from './user/user.reducer';
import dmReducer from './dm/dm.reducer';
import eventsReducer from './events/events.reducer';
import dndReducer from './dnd/dnd.reducer';
import newsReducer from './news/news.reducer';
import miscReducer from './misc/misc.reducer';
import badgeReducer from './badges/badges.reducer';
import modalReducer from './modal/modal.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  dms: dmReducer,
  events: eventsReducer,
  dnd: dndReducer,
  toastr: toastrReducer,
  news: newsReducer,
  misc: miscReducer,
  badges: badgeReducer,
  modal: modalReducer
});

export default persistReducer(persistConfig, rootReducer);
