import axios from 'axios';

export const postRegister = (firstName, lastName, email, password, role) =>
  axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/auth/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      firstName,
      lastName,
      email,
      password,
      role
    }
  });
