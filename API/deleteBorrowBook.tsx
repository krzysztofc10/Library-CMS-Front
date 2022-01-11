import axios from 'axios';

export const deleteBorrowBook = (bookId, copyId, borrowId, token) =>
  axios({
    method: 'delete',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books/${bookId}/copies/${copyId}/borrows/${borrowId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
