import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  dataSearch: [],
  errorSearch: null
};

export const searchMusicReducer = createReducer(initialState, {
  [types.SEARCH_MUSIC_SUCCESS](state, action) {
    return {
      ...state,
      dataSearch: action.dataMusic,
      errorSong: null
    }
  },
  [types.SEARCH_MUSIC_FAILED](state, action) {
    return {
      ...state,
      dataSearch: [],
      errorSong: action.error
    }
  }
});