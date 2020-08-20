
import * as types from './types';

export function loadingGetDataMusic() {
  return {
    type: types.MUSIC_ENABLE_LOADER
  }
}

export function stopLoadingGetDataMusic() {
  return {
    type: types.MUSIC_DISABLE_LOADER
  }
}

export function getDataMusic(loading = true) {
  return {
    type: types.GET_DATA_MUSIC,
    loading
  }
}

export function getDataMusicSuccess(music) {
  return {
    type: types.GET_DATA_MUSIC_SUCCESS,
    music
  }
}

export function getDataMusicFailure(error) {
  return {
    type: types.GET_DATA_MUSIC_FAILED,
    error
  }
}
