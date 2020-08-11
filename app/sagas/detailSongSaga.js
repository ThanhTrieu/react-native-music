import { put, call, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as detailSongActions from 'app/actions/detailSongActions';
import detailSongApi from 'app/api/methods/detailSong';
import * as types from '../actions/types';


function* getDataDetailSongAsync({id, status}) {
  try {
    yield put(detailSongActions.loadingGetDetailSong()); // loading data
    // call api
    const response = yield call(detailSongApi, id, status);

    if(response){
      yield put(detailSongActions.getDetailSongSuccess(response));
      yield put(detailSongActions.stopLoadingGetDetailSong());
    } else {
      yield put(detailSongActions.getDetailSongFailure('Not found data'));
      yield put(detailSongActions.stopLoadingGetDetailSong());
    
      setTimeout(() => {
        Alert.alert('BoilerPlate', 'Not found data');
      }, 200);
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchGetDataDetailSong() {
  yield takeLatest(types.GET_DETAIL_SONG, getDataDetailSongAsync);
}


