import axios from 'axios';

export const postBookBorrowCopies = (id, borrowId, token) =>
  axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books/${id}/copies/${borrowId}/borrows`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      dateFrom: '2021-12-23T13:16:28.263Z',
      userId: 1,
      id: id,
      dateTo: '2021-12-23T13:16:28.263Z'
    }
  });
