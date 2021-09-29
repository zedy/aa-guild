// libs
import { all, call } from 'redux-saga/effects';

// saga
import { userSagas } from './user/user.saga';

export default function* rootSaga() {
  yield all([call(userSagas)]);
}
