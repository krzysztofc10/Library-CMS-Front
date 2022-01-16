import axios from 'axios';

export const getPublishers = () =>
  axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/publishers`);
