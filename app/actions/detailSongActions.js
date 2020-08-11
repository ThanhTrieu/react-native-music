import * as types from './types';

export function loadingGetDetailSong() {
  return {
    type: types.MUSIC_ENABLE_LOADER
  }
}

export function stopLoadingGetDetailSong() {
  return {
    type: types.MUSIC_DISABLE_LOADER
  }
}

export function getDetailSongById(id, status) {
  return {
    type: types.GET_DETAIL_SONG,
    id,
    status
  }
}

export function getDetailSongSuccess(detailSong) {
  return {
    type: types.GET_DETAIL_SONG_SUCCESS,
    detailSong
  }
}

export function getDetailSongFailure(error) {
  return {
    type: types.GET_DETAIL_SONG_FAILED,
    error
  }
}
