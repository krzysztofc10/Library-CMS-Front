import axios from 'axios';

export const getBooksAuthors = (firstName = '', lastName = '') => {
  let resp;
  if (firstName.length > 0 && lastName.length > 0) {
    resp = axios.get(
      `${process.env.NEXT_PUBLIC_API_ADRESS}/books/authors?firstName=${firstName}&lastName=${lastName}`
    );
  }
  if (firstName.length > 0 && lastName === '') {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/authors?firstName=${firstName}`);
  }
  if (firstName === '' && lastName.length > 0) {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/authors?lastName=${lastName}`);
  } else {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/authors`);
  }
  return resp;
};
