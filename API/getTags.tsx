import axios from 'axios';

export const getBooksTags = (lang: '') => {
  let resp;
  if (lang === '') {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/languages`);
  } else {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/languages?value=${lang}`);
  }
  return resp;
};
