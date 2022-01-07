import axios from 'axios';

export const postCreateBook = (
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
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_ADRESS}/books`,
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
