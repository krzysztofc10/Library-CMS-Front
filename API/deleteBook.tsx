import axios from 'axios';

export const deleteBook = (bookId, token) =>
  axios({
    method: 'delete',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books/${bookId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
