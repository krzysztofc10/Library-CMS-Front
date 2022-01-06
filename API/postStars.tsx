import axios from 'axios';

export const postStars = (id, value, token) =>
  axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books/${id}/ratings`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      value,
      comment: 'default'
    }
  });
