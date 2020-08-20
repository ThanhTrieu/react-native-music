/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loadingMusicReducer from './loadingMusicReducer';
import * as loginReducer from './loginReducer';
import * as musicReducer from './musicReducer';
import * as detailSongReducer from './detailSongReducer';
import * as searchMusicReducer from './searchReducer';

export default Object.assign(
  loginReducer,
  loadingReducer,
  loadingMusicReducer,
  musicReducer,
  detailSongReducer,
  searchMusicReducer
);
