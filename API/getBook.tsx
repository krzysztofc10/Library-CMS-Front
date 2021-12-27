import axios from 'axios';

export const getBookInfo = (id) => axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/${id}`);
