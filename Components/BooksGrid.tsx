import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteBook } from '../API/deleteBook.tsx';

export const BookGrids = ({
  data: { title, id, issueDate, type, pages, authors },
  updateBooks
}) => {
  const newPhoto = String(id).length === 1 ? `0${id}` : String(id);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [userRole, setUserRole] = useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteBookButton = async () => {
    const token = localStorage.getItem('token');
    await deleteBook(id, token);
    updateBooks();
  };

  useEffect(() => {
    if (localStorage.getItem('role') !== undefined) {
      setUserRole(localStorage.getItem('role'));
    }
  }, []);

  return (
    <Card sx={{ display: 'flex', boxShadow: 10, position: 'relative' }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={`https://raw.githubusercontent.com/anqxyr/racovimge/master/examples/ex${newPhoto}.png`}
        alt="Book"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <div style={{ float: 'right' }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch'
                }
              }}
            >
              <Link
                href={{
                  pathname: '/book/view/[id]',
                  query: { id }
                }}
              >
                <MenuItem key="1" onClick={handleClose}>
                  Podgląd
                </MenuItem>
              </Link>
              {userRole.length > 0 && (
                <Link
                  href={{
                    pathname: '/book/borrow/[id]',
                    query: { id }
                  }}
                >
                  <MenuItem key="2" onClick={handleClose}>
                    Wypożycz
                  </MenuItem>
                </Link>
              )}
              {userRole.length > 0 && (
                <Link
                  href={{
                    pathname: '/book/createCopy/[id]',
                    query: { id }
                  }}
                >
                  <MenuItem key="3" onClick={handleClose}>
                    Utwórz egzemplarz
                  </MenuItem>
                </Link>
              )}
              {userRole.length > 0 && (
                <Link
                  href={{
                    pathname: '/book/edit/[id]',
                    query: { id }
                  }}
                >
                  <MenuItem key="3" onClick={handleClose}>
                    Edytuj
                  </MenuItem>
                </Link>
              )}
              {userRole === 'admin' && (
                <MenuItem key="4" onClick={() => deleteBookButton()}>
                  Usuń
                </MenuItem>
              )}
            </Menu>
          </div>
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
      </Box>
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
