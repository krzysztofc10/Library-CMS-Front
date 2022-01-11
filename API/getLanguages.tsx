import axios from 'axios';

export const getLanguages = (value = '') => {
  let resp;
  if (value === '') {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/publishers`);
  } else {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/publishers?name=${name}`);
  }
  return resp;
};
