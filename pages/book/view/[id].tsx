import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getBookInfo } from '../../../API/getBook.tsx';

const style = {
  marginTop: 10,
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  justifyContent: 'center'
};

export default () => {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const newPhoto = String(id).length === 1 ? `0${id}` : String(id);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      setIsLoading(true);

      const dane = await getBookInfo(id);
      setBook(dane.data.book);
      setIsLoading(false);
    };
    fetchData();
  }, [setBook, router.isReady]);

  return (
    <div>
      {!isLoading && (
        <Box sx={style}>
          <Box width={300} height={400}>
            <img
              src={`https://raw.githubusercontent.com/anqxyr/racovimge/master/examples/ex${newPhoto}.png`}
              alt="Live from space album cover"
              height={400}
              width={270}
            />
          </Box>
          <Box>
            <Typography id="modal-modal-title" variant="h3" component="h3">
              {book.title}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="p"
              style={{ fontSize: 12 }}
            >
              ISBN: {book.isbn}
            </Typography>
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Autorzy:
              {book.authors.map((el) => (
                <div key={el.id} style={{ marginLeft: 20 }}>
                  {el.firstName} {el.lastName}
                </div>
              ))}
            </Typography>
            {book.description !== null && (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {book.description}
              </Typography>
            )}
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Gatunek: {book.genre.value}
            </Typography>
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Liczba stron: {book.pages}
            </Typography>
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Język: {book.language.value}
            </Typography>
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Data wydania: {book.issueDate}
            </Typography>
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Wydawca: {book.publisher.name}
            </Typography>
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Typ: {book.type}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};
