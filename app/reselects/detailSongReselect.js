import { createSelector } from 'reselect';

const detailSongState = state => state.detailSongReducer;

export const detailSongData = createSelector(
  detailSongState,
  item => item.detailSong
);