import axios from 'axios';

export const getLanguages = () =>
  axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/languages`);
