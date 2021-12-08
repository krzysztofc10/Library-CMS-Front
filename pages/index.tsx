import React, { useState, useEffect } from 'react';
import { Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BookGrids } from './Components/BooksGrid';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const setInputValue = (event: any) => {
    setSearchInput(event.target.value);
  };
  // console.log(process.env.NEXT_PUBLIC_API_ADRESS);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_ADRESS}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data.books));
  }, []);
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
        {books.length > 0 &&
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
