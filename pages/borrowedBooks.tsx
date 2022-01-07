import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUserBorrowedBooks } from '../API/getUserBorrowedBooks';

export default function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const getUserBooks = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const resp = await getUserBorrowedBooks(userId, token);
      setBorrowedBooks(resp.data.borrows);
    };
    getUserBooks();
  }, []);

  return (
    <TableContainer component={Paper} style={{ marginTop: 50 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">number</TableCell>
            <TableCell align="right">isbn</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">Date From</TableCell>
            <TableCell align="right">Date To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {borrowedBooks.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.copy.number}</TableCell>
              <TableCell align="right">{row.copy.book.isbn}</TableCell>
              <TableCell align="right">{row.copy.book.title}</TableCell>
              <TableCell align="right">{row.dateFrom}</TableCell>
              <TableCell align="right">{row.dateTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
