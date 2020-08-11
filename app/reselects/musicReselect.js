import { createSelector } from 'reselect';

const musicState = state => state.musicReducer;

export const categoryMusic = createSelector(
  musicState,
  item => item.dataMusic.category
);

export const topSinger = createSelector(
  musicState,
  item => item.dataMusic.singer
);

export const topComposer = createSelector(
  musicState,
  item => item.dataMusic.composer
);