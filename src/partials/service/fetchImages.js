import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '28008769-991cef6bea94341115fdc5eba';

export const fetchImages = (name, page) => {
  return axios.get(
    `?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
};

// export const fetchImages = async (name, page) => {
//   const response = await fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=3`
//   );
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   const searchResult = await response.json();
//   return searchResult;
// };
