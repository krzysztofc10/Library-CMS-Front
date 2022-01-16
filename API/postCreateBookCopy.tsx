import axios from 'axios';

export const postCreateBookCopy = (id, copies, token) =>
  axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books/${id}/copies`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      number: copies
    }
  });
