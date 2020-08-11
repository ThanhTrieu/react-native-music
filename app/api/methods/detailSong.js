import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function detailSong(id, status) {
  const url = `${ApiConstants.DETAIL_SONG_BY_ID}?id=${id}&status=${status}`;
  return Api(
    url,
    null,
    'get',
    null,
  );
}