import React, { useState, useEffect } from 'react';
import { Alert, Paper, InputBase, Fab, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { BookGrids } from '../Components/BooksGrid';
import { CreateBookModal } from '../Components/CreateBook';
import { getBooks } from '../API/getBooks';
import styles from '../styles/index.module.css';

export default function Home() {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const setInputValue = (event: any) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getBooks();
      setBooks(data.data.books);
      setIsLoading(false);
    };
    fetchData();
  }, [setBooks]);

  const createBookModal = (text) => {
    const timeoutFc = async () => {
      await setAlertContent('Ksiąką został utworzona');
      await setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    };
    setCreateModalVisible(!createModalVisible);
    if (text === 'Created') {
      timeoutFc();
    }
  };

  return (
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
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          marginTop: 2,
          float: 'right'
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Books"
          inputProps={{ 'aria-label': 'search books' }}
          onChange={setInputValue}
        />
        <SearchIcon />
      </Paper>
      <div className="grid-container">
        {!isLoading &&
          books.map((el) =>
            searchInput.length > 0 ? (
              el.title.toLowerCase().startsWith(searchInput) || el.title.startsWith(searchInput) ? (
                <BookGrids data={el} />
              ) : null
            ) : (
              <BookGrids data={el} key={el.id} />
            )
          )}
        <Fab
          aria-label="add"
          color="primary"
          className={styles.fab}
          onClick={() => setCreateModalVisible(true)}
        >
          <AddIcon />
        </Fab>
        <CreateBookModal
          modalVisible={createModalVisible}
          setModalVisible={(text) => createBookModal(text)}
        />
      </div>
    </>
  );
}
