import { put, call, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as musicActions from 'app/actions/musicActions';
import musicApi from 'app/api/methods/music';
import * as types from '../actions/types';


function* getDataMusicAsync() {
  try {
    yield put(musicActions.loadingGetDataMusic()); // loading data
    // call api
    const response = yield call(musicApi);
    if(response){
      yield put(musicActions.getDataMusicSuccess(response));
      yield put(musicActions.stopLoadingGetDataMusic())
    } else {
      yield put(musicActions.getDataMusicFailure('Not found data'));
      yield put(musicActions.stopLoadingGetDataMusic());
      setTimeout(() => {
        Alert.alert('BoilerPlate', 'Not found data');
      }, 200);
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchGetDataMusic() {
  yield takeLatest(types.GET_DATA_MUSIC, getDataMusicAsync);
}


