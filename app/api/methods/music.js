import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function music() {
  return Api(
    ApiConstants.ALL_DATA_MUSIC,
    null,
    'get',
    null,
  );
}