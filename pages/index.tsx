import React, { useState, useEffect } from 'react';
import { Paper, Fab } from '@mui/material';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import { BookGrids } from '../Components/BooksGrid';
import { getBooks } from '../API/getBooks';
import { MultiSearch } from '../Components/MultiSearch.tsx';
import styles from '../styles/index.module.css';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getBooks();
      setBooks(data.data.books);
      setIsLoading(false);
    };
    fetchData();
    if (localStorage.getItem('role') !== null && localStorage.getItem('role').length > 0) {
      setUserRole(localStorage.getItem('role'));
    } else {
      setUserRole('');
    }
  }, [setBooks]);

  const updateData = async () => {
    const data = await getBooks();
    setBooks(data.data.books);
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          display: 'flex',
          width: 300,
          marginTop: 0.5,
          float: 'right'
        }}
      >
        <MultiSearch
          data={books}
          valKey="title"
          addMore={false}
          setInputVal={(val) => setSearchInput(val)}
        />
      </Paper>
      <div className="grid-container">
        {!isLoading &&
          books.map((el) =>
            searchInput.length > 0 ? (
              el.title.toLowerCase().startsWith(searchInput) || el.title.startsWith(searchInput) ? (
                <BookGrids data={el} key={el.id} updateBooks={() => updateData()} />
              ) : null
            ) : (
              <BookGrids data={el} key={el.id} updateBooks={() => updateData()} />
            )
          )}
        {userRole !== 'customer' && userRole !== '' && (
          <Link href="/book/create">
            <Fab aria-label="add" color="primary" className={styles.fab}>
              <AddIcon />
            </Fab>
          </Link>
        )}
      </div>
    </>
  );
}
