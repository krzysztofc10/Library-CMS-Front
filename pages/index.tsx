import React, { useState, useEffect } from 'react';
import { Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BookGrids } from '../Components/BooksGrid';
import { getBooks } from '../API/getBooks';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setInputValue = (event: any) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getBooks();
      setBooks(data);
      setIsLoading(false);
    };
    fetchData();
  }, [setBooks]);

  return (
    <>
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
      </div>
    </>
  );
}
