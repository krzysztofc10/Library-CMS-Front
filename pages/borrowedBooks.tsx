import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { getUserBorrowedBooks } from '../API/getUserBorrowedBooks';
import { deleteBorrowBook } from '../API/deleteBorrowBook';
export default function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const returnCopy = async (bookId, copyId, borrowId) => {
    const token = localStorage.getItem('token');
    deleteBorrowBook(bookId, copyId, borrowId, token);
  };
  useEffect(() => {
    const getUserBooks = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const resp = await getUserBorrowedBooks(userId, token);

      setBorrowedBooks(resp.data.borrows);
    };
    getUserBooks();
  }, [returnCopy]);

  return (
    <TableContainer component={Paper} style={{ marginTop: 50 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">book Id</TableCell>
            <TableCell align="right">copy Id</TableCell>
            <TableCell align="right">borrow Id</TableCell>
            <TableCell align="right">isbn</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">Date From</TableCell>
            <TableCell align="right">Return</TableCell>
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
                <Button onClick={() => returnCopy(row.copy.book.id, row.copy.id, row.id)}>
                  Return
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
