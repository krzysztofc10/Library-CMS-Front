import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
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
    const fetchData = async () => {
      setIsLoading(true);

      const dane = await getBookInfo(id);
      await setBook(dane.data.book);
      setIsLoading(false);
      setIsLoadingCopies(true);
      const token = localStorage.getItem('token');
      const bookCopiesData = await getBookCopies(id, token);
      await setBookCopies(bookCopiesData.data.copies);
      setIsLoadingCopies(false);
    };
    fetchData();
    if (!router.isReady) return;
  }, [router.isReady]);

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

  return !isLoading ? (
    <>
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
      <Box sx={style}>
        <Box width={600} height={700}>
          <img
            src={`https://raw.githubusercontent.com/anqxyr/racovimge/master/examples/ex${newPhoto}.png`}
            alt="Live from space album cover"
            width={600}
            height={700}
          />
        </Box>
        <Box>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Tytuł"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.title}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="ISBN"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.isbn}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Autorzy"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.authors.map((el) => (
                      <div key={el.id}>
                        {el.firstName} {el.lastName}
                      </div>
                    ))}
                  </Typography>
                }
              />
            </ListItem>
            {book.description !== null && (
              <>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Description"
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {book.description}
                      </Typography>
                    }
                  />
                </ListItem>
              </>
            )}
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Gatunek"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.genre.value}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Liczba stron"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.pages}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Język"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.language.value}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Data wydania"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.issueDate}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Wydawca"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.publisher.name}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Typ"
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {book.type}
                  </Typography>
                }
              />
            </ListItem>
          </List>
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
              style={{ gridColumnStart: 2, gridColumnEnd: 3, float: 'right', marginTop: 10 }}
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
    </>
  ) : (
    <Box></Box>
  );
};
