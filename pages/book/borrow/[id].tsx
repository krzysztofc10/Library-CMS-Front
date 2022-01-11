import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes, { any, arrayOf, bool, func, number } from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { getBookInfo } from '../../../API/getBook.tsx';
import { getBookCopies } from '../../../API/getBookCopies.tsx';
import { postBookBorrowCopies } from '../../../API/postBorrowBook.tsx';

const style = {
  marginTop: 10,
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  justifyContent: 'center'
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'number', headerName: 'number', width: 130 }
];

export default () => {
  const [book, setBook] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [bookCopies, setBookCopies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCopies, setIsLoadingCopies] = useState(true);
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [rowId, setRowId] = useState([]);
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
      setIsLoadingCopies(true);
      const token = localStorage.getItem('token');
      const bookCopiesData = await getBookCopies(id, token);
      setBookCopies(bookCopiesData.data.copies);
      setIsLoadingCopies(false);
    };
    fetchData();
  }, [setBook, router.isReady]);

  const rowClicked = async (rowVal) => {
    if (rowId.indexOf(rowVal.row.id) === -1) {
      await setRowId([rowVal.row.id]);
    } else {
      await setRowId([]);
    }
  };

  const borrowBook = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const post = await postBookBorrowCopies(id, rowId[0], token, userId);
    if (post.statusText === 'Created') {
      setAlertContent('Wypożyczono książkę');
    } else {
      setAlertContent('Nie wypożyczono książki');
    }
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 700);
  };

  return (
    <div>
      {alert && (
        <Stack
          style={{
            position: 'absolute',
            zIndex: 9999,
            width: 500,
            left: '35%',
            right: '50%',
            top: '0%'
          }}
          spacing={2}
        >
          <Alert>{alertContent}</Alert>
        </Stack>
      )}

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
          {!isLoadingCopies && (
            <Box
              style={{
                height: 200,
                width: '100%',
                marginTop: 10,
                gridColumnStart: 1,
                gridColumnEnd: 3
              }}
            >
              {/* <Typography id="modal-modal-asdsadsa" variant="h5" component="h5">
                  {bookCopies.map((el) => (
                      <div key={el.id} style={{ marginLeft: 20 }}>
                        {el.number}
                      </div>
                    ))
                  }
                </Typography> */}
              <DataGrid
                rows={bookCopies.map((el) => ({ id: el.id, number: el.number }))}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onRowClick={(id) => rowClicked(id)}
                onSelectionModelChange={(selection) => {
                  if (selection.length > 1) {
                    const selectionSet = new Set(selectionModel);
                    const result = selection.filter((s) => !selectionSet.has(s));

                    setSelectionModel(result);
                  } else {
                    setSelectionModel(selection);
                  }
                }}
              />
              <Button
                disabled={rowId.length < 1}
                style={{ gridColumnStart: 2, gridColumnEnd: 3, float: 'right' }}
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => borrowBook()}
              >
                Wypożycz
              </Button>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};
