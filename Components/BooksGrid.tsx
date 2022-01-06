import React, { useState, useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from '../styles/bookGrid.module.css';
import { BookPreviewModal } from './BookPreview';
import { postStars } from '../API/postStars.tsx';

export const BookGrids = ({ data: { title, id, issueDate, type, pages, authors } }: any) => {
  const newPhoto = String(id).length === 1 ? `0${id}` : String(id);
  const [stars, setStars] = React.useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBorrow, setIsBorrow] = useState(false);

  const setVisibility = () => {
    setIsBorrow(false);
    setModalVisible(!modalVisible);
  };

  const setBorrowVisibility = () => {
    setIsBorrow(!isBorrow);
    setModalVisible(!modalVisible);
  };

  const setBooksRatings = async (val) => {
    const token = localStorage.getItem('token');
    setStars(val);
    await postStars(id, val.toString(), token);
  };

  return (
    <Card sx={{ display: 'flex', boxShadow: 10, position: 'relative' }}>
      <Rating
        name="simple-controlled"
        className={styles.books}
        value={stars}
        onChange={(event, newValue) => {
          setBooksRatings(newValue);
        }}
      />
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={`https://raw.githubusercontent.com/anqxyr/racovimge/master/examples/ex${newPhoto}.png`}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {authors.map((el) => (
              <div key={el.id}>
                {el.firstName} {el.lastName}
              </div>
            ))}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Rok wydania: {issueDate.split('-')[0]}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Typ: {type}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            L.Stron: {pages}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
          <Button
            variant="contained"
            size="small"
            style={{ marginRight: 3, marginLeft: 5 }}
            onClick={() => setBorrowVisibility()}
          >
            Wypożycz
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => setVisibility()}
          >
            Podgląd
          </Button>
        </Box>
      </Box>
      <BookPreviewModal
        id={id}
        modalVisible={modalVisible}
        setModalVisible={() => setVisibility()}
        isBorrow={isBorrow}
      />
    </Card>
  );
};

BookGrids.defaultProps = {
  data: {
    authors: [{ id: '', firstName: '', lastName: '' }],
    id: 0,
    pages: 0,
    isbn: '',
    type: '',
    title: '',
    issueDate: ''
  }
};
