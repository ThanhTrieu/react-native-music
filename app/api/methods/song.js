import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function song(page, limit) {
  const url = `${ApiConstants.LIST_SONG_PAGING}?page=${page}&limit=${limit}`;
  return Api(
    url,
    null,
    'get',
    null,
  );
}