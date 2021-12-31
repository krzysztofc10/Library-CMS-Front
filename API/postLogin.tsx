import axios from 'axios';

export const postLogin = (email, password) =>
  axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/auth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email,
      password
    }
  });
