import axios from 'axios';

export const putModifyBook = (
  id,
  isbn,
  type,
  title,
  description,
  issueDate,
  publisher,
  authors,
  genre,
  language,
  pages,
  tags,
  token
) =>
  axios({
    method: 'put',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      isbn,
      type,
      title,
      description,
      issueDate,
      publisher,
      authors,
      genre,
      language,
      pages,
      tags
    }
  });
