import axios from 'axios';

export const getBookCopies = (id, token) =>
  axios.get(`${process.env.NEXT_PUBLIC_API_ADRESS}/books/${id}/copies`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
