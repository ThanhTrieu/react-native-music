import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  dataMusic: [],
  errorMusic: null
};

export const musicReducer = createReducer(initialState, {
  [types.GET_DATA_MUSIC_SUCCESS](state, action) {
    return {
      ...state,
      dataMusic: action.music,
      errorMusic: null
    }
  },
  [types.GET_DATA_MUSIC_FAILURE](state, action) {
    return {
      ...state,
      dataMusic: [],
      errorMusic: action.error
    }
  }
});