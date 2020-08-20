import { put, call, debounce } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as searchActions from 'app/actions/searchActions';
import searchApi from 'app/api/methods/searchMusic';
import * as types from '../actions/types';


function* searchDataMusicAsync({ keyword }) {
  try {
    // call api
    const response = yield call(searchApi, keyword);
    console.log(response);
    if(response){
      yield put(searchActions.searchMusicSuccess(response));
    } else {
      yield put(searchActions.searchMusicFailure('Not found data'));    
      setTimeout(() => {
        Alert.alert('BoilerPlate', 'Not found data');
      }, 200);
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* watchSearchDataMusic() {
  yield debounce(500, types.SEARCH_MUSIC, searchDataMusicAsync);
}


