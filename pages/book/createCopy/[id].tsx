import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { getBookInfo } from '../../../API/getBook.tsx';
import { postCreateBookCopy } from '../../../API/postCreateBookCopy.tsx';

const style = {
  marginTop: 2,
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  justifyContent: 'center'
};

export default () => {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copies, setCopies] = useState('');
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

  const submitButton = async () => {
    const token = localStorage.getItem('token');
    await postCreateBookCopy(id, copies, token);
    setCopies('');
    document.getElementById('includeCopies').value = '';
  };

  return !isLoading ? (
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
          <Divider component="li" />
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
          <Divider component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Utwórz egzemplarze (wiele egzemplarzy proszę wpisać po przecinku):"
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <TextField
                    style={{ marginTop: 10 }}
                    id="includeCopies"
                    label="Egzemplarze"
                    onChange={(e) => setCopies(e.target.value)}
                  />
                </Typography>
              }
            />
          </ListItem>
          <Divider component="li" />
        </List>
      </Box>
      <Button
        style={{ gridColumnStart: 2, gridColumnEnd: 3 }}
        variant="contained"
        size="small"
        color="secondary"
        disabled={copies.length === 0}
        onClick={() => submitButton()}
      >
        Dodaj egzemplarze
      </Button>
    </Box>
  ) : (
    <Box></Box>
  );
};
