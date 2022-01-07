import axios from 'axios';

export const getUserBorrowedBooks = (userId, token) =>
  axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books/users/${userId}/borrows`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
