/**
 *  Redux saga class init
 */
import { all, call } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import musicSaga from './musicSaga';
import detailSongSaga from './detailSongSaga';

export default function* watch() {
  yield all([
    call(loginSaga),
    call(musicSaga),
    call(detailSongSaga),
  ]);
}
