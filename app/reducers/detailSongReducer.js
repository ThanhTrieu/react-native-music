import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  detailSong: [],
  errorSong: null
};

export const detailSongReducer = createReducer(initialState, {
  [types.GET_DETAIL_SONG_SUCCESS](state, action) {
    return {
      ...state,
      detailSong: action.detailSong,
      errorSong: null
    }
  },
  [types.GET_DETAIL_SONG_FAILED](state, action) {
    return {
      ...state,
      dataSong: [],
      errorSong: action.error
    }
  }
});