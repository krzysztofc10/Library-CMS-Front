import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import * as locales from '../content/locale';
import { getUserBorrowedBooks } from '../API/getUserBorrowedBooks';
import { putBorrowBook } from '../API/putBorrowBook';
import { deleteBorrowBook } from '../API/deleteBorrowBook';

export default function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userRole, setUserRole] = useState('');
  const returnCopy = async (bookId, copyId, borrowId) => {
    const token = localStorage.getItem('token');
    await putBorrowBook(bookId, copyId, borrowId, token);
    const userId = localStorage.getItem('userId');
    const resp = await getUserBorrowedBooks(userId, token);
    setBorrowedBooks(resp.data.borrows);
  };
  const deleteCopy = async (bookId, copyId, borrowId) => {
    const token = localStorage.getItem('token');
    await deleteBorrowBook(bookId, copyId, borrowId, token);
    const userId = localStorage.getItem('userId');
    const resp = await getUserBorrowedBooks(userId, token);
    setBorrowedBooks(resp.data.borrows);
  };
  const router = useRouter();
  const localeMessages = locales[router.locale];
  useEffect(() => {
    const getUserBooks = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const resp = await getUserBorrowedBooks(userId, token);

      setBorrowedBooks(resp.data.borrows);
    };
    getUserBooks();
    if (localStorage.getItem('role') !== null && localStorage.getItem('role').length > 0) {
      setUserRole(localStorage.getItem('role'));
    } else {
      setUserRole('');
    }
  }, []);

  return (
    <IntlProvider locale={router.locale} defaultLocale={router.defaultLocale}>
      <TableContainer component={Paper} style={{ marginTop: 50 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">{localeMessages.BookID}</TableCell>
              <TableCell align="right">{localeMessages.CopyID}</TableCell>
              <TableCell align="right">{localeMessages.BorrowID}</TableCell>
              <TableCell align="right">Isbn</TableCell>
              <TableCell align="right">{localeMessages.Title}</TableCell>
              <TableCell align="right">{localeMessages.DateFrom}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowedBooks.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{row.copy.book.id}</TableCell>
                <TableCell align="right">{row.copy.id}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.copy.book.isbn}</TableCell>
                <TableCell align="right">{row.copy.book.title}</TableCell>
                <TableCell align="right">{row.dateFrom}</TableCell>
                <TableCell align="right">
                  {row.dateTo === null && (userRole === 'admin' || userRole === 'employee') ? (
                    <Button onClick={() => returnCopy(row.copy.book.id, row.copy.id, row.id)}>
                      {localeMessages.Return}
                    </Button>
                  ) : (
                    <div style={{ color: '#90caf9' }}>
                      {row.dateTo !== null ? localeMessages.Returned : null}
                    </div>
                  )}
                </TableCell>
                {userRole === 'admin' && (
                  <TableCell align="right">
                    <Button onClick={() => deleteCopy(row.copy.book.id, row.copy.id, row.id)}>
                      {localeMessages.Delete}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </IntlProvider>
  );
}
