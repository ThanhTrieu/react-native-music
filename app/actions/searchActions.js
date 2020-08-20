import * as types from './types';


export function searchMusic(keyword) {
  return {
    type: types.SEARCH_MUSIC,
    keyword
  }
}

export function searchMusicSuccess(dataMusic) {
  return {
    type: types.SEARCH_MUSIC_SUCCESS,
    dataMusic
  }
}

export function searchMusicFailure(error) {
  return {
    type: types.SEARCH_MUSIC_FAILED,
    error
  }
}
