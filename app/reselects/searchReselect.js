import { createSelector } from 'reselect';

const searchMusicState = state => state.searchMusicReducer;

export const searchMusicData = createSelector(
  searchMusicState,
  item => item.dataSearch
);