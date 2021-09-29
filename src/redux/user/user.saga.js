// libs
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

// constants
import TOASTR_MESSAGES from '../../data/toastr-messages.data';

// redux
import {
  googleSignInSuccess,
  googleSignInFailure,
  emailSignInFailure,
  emailSignInSuccess
} from './user.actions';

// firebase
import {
  googleProvider,
  auth,
  createUserProfileDocument
} from '../../firebase/firebase.utils';

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const firestoreResponse = yield call(createUserProfileDocument, user);
    const snapShot = firestoreResponse.payload.collectionRef.get();

    yield put(googleSignInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (e) {
    toastr.error(TOASTR_MESSAGES.signinFail);
    yield put(googleSignInFailure(e));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest('GOOGLE_SIGN_IN_START', signInWithGoogle);
}

export function* signInWithEmail({ payload: { signinEmail, signinPassword } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(
      signinEmail,
      signinPassword
    );
    const firestoreResponse = yield call(createUserProfileDocument, user);
    const snapShot = yield firestoreResponse.payload.collectionRef.get();

    yield put(emailSignInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (e) {
    toastr.error(e.message);
    yield put(emailSignInFailure(e.message));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest('EMAIL_SIGN_IN_START', signInWithEmail);
}

export function* userSagas() {
  yield all([call(onEmailSignInStart), call(onGoogleSignInStart)]);
}
