/* eslint-disable react/prop-types  */
/* eslint-disable react/jsx-props-no-spreading  */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContrastIcon from '@mui/icons-material/Contrast';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import bookImg from '../Images/bookblue-open.svg';
import { colorHash } from './Helpers/colorName';
import { BookGrids } from './BooksGrid';
import { LoginAndRegister } from '../Components/LoginAndRegister';
import '../styles/globals.css';
import '../styles/Home.css';

function MyApp({ Component, pageProps }) {
  const user = 'Krzysztof M';
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mode, setMode] = useState('light');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if (localStorage.getItem('mode') === null) {
      localStorage.setItem('mode', 'light');
    } else {
      setMode(localStorage.getItem('mode'));
    }

    if (localStorage.getItem('token').length > 0) {
      setToken(localStorage.getItem('token'));
    } else {
      setToken('');
    }
  }, [setToken]);

  const loginToApp = (tokenVal) => {
    setToken(tokenVal);
  };

  const toggleColorMode = () => {
    if (mode === 'light') {
      localStorage.setItem('mode', 'dark');
      setMode('dark');
    } else {
      localStorage.setItem('mode', 'light');
      setMode('light');
    }
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode }
      }),
    [mode]
  );
  const pages = ['Wypożycz książkę', 'Zwróć książkę', 'Pokaż wypożyczone książki'];
  const settings = ['Ustawienia', 'Wyloguj'];

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Image src={bookImg} alt="book" width="80px" height="80px" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {token.length > 0 &&
                  pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <Image src={bookImg} alt="book" width="60px" height="60px" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {token.length > 0 &&
                pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Otwórz ustawienia">
                <>
                  {token.length > 0 && (
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: colorHash(user) }}>{user.match(/\b(\w)/g)}</Avatar>
                    </IconButton>
                  )}
                  <IconButton onClick={toggleColorMode}>
                    <ContrastIcon sx={{ fontSize: 45 }} />
                  </IconButton>
                </>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {token.length > 0 ? (
        <Component {...pageProps} />
      ) : (
        <LoginAndRegister loginFunc={(val) => loginToApp(val)} />
      )}
    </ThemeProvider>
  );
}
export default MyApp;
