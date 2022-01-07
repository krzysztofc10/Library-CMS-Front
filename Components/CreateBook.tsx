import React, { useEffect, useState } from 'react';
import { bool, func, number, object } from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { postCreateBook } from '../API/postCreateBook.tsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -40%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'grid',
  gridTemplateRows: 'auto auto'
};

export const CreateBookModal = ({ modalVisible, setModalVisible }) => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authors, setAuthors] = useState([]);
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState({});
  const [noOfPages, setNoOfPages] = useState('');
  const [language, setLanguage] = useState({});
  const [issueDate, setIssueDate] = useState('');
  const [publisher, setPublisher] = useState({});
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');

  const isValLengthTrue = () => {
    if (
      title.length > 0 &&
      isbn.length > 0 &&
      authors.length > 0 &&
      description.length > 0 &&
      Object.keys(genre).length > 0 &&
      noOfPages.length > 0 &&
      Object.keys(language).length > 0 &&
      issueDate.length > 0 &&
      Object.keys(publisher).length > 0 &&
      type.length > 0 &&
      tags.length > 0
    ) {
      return false;
    }
    return true;
  };

  const submitButton = async () => {
    const token = localStorage.getItem('token');
    const answer = await postCreateBook(
      isbn,
      type,
      title,
      description,
      issueDate,
      publisher,
      authors,
      genre,
      language,
      noOfPages,
      tags,
      token
    );
    setModalVisible(answer.statusText);
  };

  const setAuthorsFc = (val) => {
    const authorsArray = val.split(',');
    const authorsArrayOfObj = [];

    for (let i in authorsArray) {
      authorsArrayOfObj.push({
        firstName: authorsArray[i].split(' ')[0],
        lastName: authorsArray[i].split(' ')[1]
      });
    }
    setAuthors(authorsArrayOfObj);
  };

  const setTagsFc = (val) => {
    const tagsArr = val.split(',');
    const tagsArrayOfObj = [];

    for (let i in tagsArr) {
      tagsArrayOfObj.push({
        value: tagsArr[i]
      });
    }
    setTags(tagsArrayOfObj);
  };

  return (
    <Modal
      disablePortal
      open={modalVisible}
      onClose={setModalVisible}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          style={{
            position: 'absolute',
            left: '97%',
            top: '-3%',
            backgroundColor: 'lightgray',
            color: 'gray'
          }}
          onClick={setModalVisible}
        >
          <CloseIcon />
        </IconButton>
        <Box>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Tytuł
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            ISBN:
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setIsbn(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Autorzy (wielu autorów proszę wpisać po przecinku):
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setAuthorsFc(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Opis:
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Gatunek:
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setGenre({ value: e.target.value })}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Liczba stron:
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setNoOfPages(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Język:
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setLanguage({ value: e.target.value })}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Data wydania(YYYY-MM-DD):
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Wydawca:
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setPublisher({ name: e.target.value })}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Typ:
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Typ"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="book">Ksiązka</MenuItem>
              <MenuItem value="article">Artykuł</MenuItem>
            </Select>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h5">
            Tagi (po przecinku):
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setTagsFc(e.target.value)}
            />
          </Typography>
        </Box>
        <Box
          style={{
            height: 200,
            width: '100%',
            marginTop: 10,
            gridRowStart: 2,
            gridRowEnd: 3
          }}
        >
          <Button
            style={{ gridColumnStart: 2, gridColumnEnd: 3, float: 'right' }}
            variant="contained"
            size="small"
            color="secondary"
            disabled={isValLengthTrue()}
            onClick={() => submitButton()}
          >
            Utwórz książkę
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

CreateBookModal.propTypes = {
  modalVisible: bool.isRequired,
  setModalVisible: func.isRequired
};
