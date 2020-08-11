/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, takeEvery } from 'redux-saga/effects';

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as loginActions from 'app/actions/loginActions';
import * as types from '../actions/types';

// Our worker Saga that logins the user
function* loginAsync() {
  yield put(loginActions.enableLoader());

  //how to call api
  //const response = yield call(loginUser, action.username, action.password);
  //mock response
  const response = { success: true, data: { id: 1 } };

  if (response.success) {
    yield put(loginActions.onLoginResponse(response.data));
    yield put(loginActions.disableLoader({}));

    // no need to call navigate as this is handled by redux store with SwitchNavigator
    //yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader({}));
    setTimeout(() => {
      Alert.alert('BoilerPlate', response.Message);
    }, 200);
  }
}

export default function* watchLoginAsync() {
  yield takeEvery(types.LOGIN_REQUEST,loginAsync);
}
