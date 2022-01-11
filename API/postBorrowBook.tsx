import axios from 'axios';

export const postBookBorrowCopies = (id, borrowId, token, userId) =>
  axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books/${id}/copies/${borrowId}/borrows`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      dateFrom: new Date(Date.now()),
      userId,
      id
    }
  });
