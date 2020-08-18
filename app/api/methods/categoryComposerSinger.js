import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function categoryComposerSinger(page, limit, type) {
  const url = `${ApiConstants.LIST_CATEGORY_COMPOSER_SINGER_PAGING}?page=${page}&limit=${limit}&type=${type}`;
  return Api(
    url,
    null,
    'get',
    null,
  );
}