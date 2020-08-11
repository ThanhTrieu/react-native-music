/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isMusicLoading: false,
};

export const loadingMusicReducer = createReducer(initialState, {
  [types.MUSIC_ENABLE_LOADER](state) {
    return { ...state, isMusicLoading: true };
  },
  [types.MUSIC_DISABLE_LOADER](state) {
    return { ...state, isMusicLoading: false };
  },
});
