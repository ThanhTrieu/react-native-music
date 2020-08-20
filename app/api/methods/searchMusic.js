import { search } from 'app/utils/custom-axios';
import ApiConstants from '../ApiConstants';

const searchMusicByKeyword = async (keyword) => {
  const url = `${ApiConstants.MUSIC_URL}${ApiConstants.SEARCH_MUSIC}?q=${keyword}`;
  const response = await search(url);
  return response;
}
export default searchMusicByKeyword;