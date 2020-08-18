import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function song(page, limit, type, id) {
  let url = null;
  if(type === '1'){
    url = `${ApiConstants.LIST_SONG_PAGING}?page=${page}&limit=${limit}&cate_id=${id}`;
  } else if(type === '2') {
    url = `${ApiConstants.LIST_SONG_PAGING}?page=${page}&limit=${limit}&composer_id=${id}`;
  } else if (type === '3') {
    url = `${ApiConstants.LIST_SONG_PAGING}?page=${page}&limit=${limit}&singer_id=${id}`;
  } else {
    url = `${ApiConstants.LIST_SONG_PAGING}?page=${page}&limit=${limit}`;
  }
  
  return Api(
    url,
    null,
    'get',
    null,
  );
}