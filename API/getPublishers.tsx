import axios from 'axios';

export const getPublishers = (name: '') => {
  let resp;
  if (name === '') {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/publishers`);
  } else {
    resp = axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/publishers?name=${name}`);
  }
  return resp;
};
