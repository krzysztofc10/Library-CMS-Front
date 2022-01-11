import axios from 'axios';

export const getBooksGenres = (genre = '') => {
  let resp;
  if (genre === '') {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/genres`);
  } else {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/genres?value=${genre}`);
  }
  return resp;
};
