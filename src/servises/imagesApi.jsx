import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  key: '39014637-350db469d238078cedfe93bb7',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

const fetchData = async (request, page) => {
  const { data } = await axios.get(`?q=${request}&page=${page}`);
  return data;
};

export default fetchData;
