export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload: user
});

export const setUsersList = list => ({
  type: 'SET_USER_LIST',
  payload: list
});

export const userSignOut = () => ({
  type: 'USER_SIGNOUT'
});

export const googleSignInStart = () => ({
  type: 'GOOGLE_SIGN_IN_START'
});

export const googleSignInSuccess = user => ({
  type: 'GOOGLE_SIGN_IN_SUCCESS',
  payload: user
});

export const googleSignInFailure = message => ({
  type: 'GOOGLE_SIGN_IN_FAILURE',
  payload: message
});

export const emailSignInStart = emailAndPass => ({
  type: 'EMAIL_SIGN_IN_START',
  payload: emailAndPass
});

export const emailSignInSuccess = user => ({
  type: 'EMAIL_SIGN_IN_SUCCESS',
  payload: user
});

export const emailSignInFailure = message => ({
  type: 'EMAIL_SIGN_IN_FAILURE',
  payload: message
});

export const closedNewUserModal = () => ({
  type: 'CLOSED_NEW_USER_MODAL'
});
