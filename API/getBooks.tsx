import axios from 'axios';

export const getBooks = () => axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books`);
