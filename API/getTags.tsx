import axios from 'axios';

export const getBooksTags = () => axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/tags`);
