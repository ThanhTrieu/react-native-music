import { createSelector } from 'reselect';

const musicLoadingState = state => state.loadingMusicReducer;

export const startLoadingMusic = createSelector(
  musicLoadingState,
  item => item.isMusicLoading
);