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
  Tooltip,
  MenuItem,
  IconButton
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContrastIcon from '@mui/icons-material/Contrast';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import jwtDecode from 'jwt-decode';
import bookImg from '../Images/bookblue-open.svg';
import { colorHash } from './Helpers/colorName';
import { LoginAndRegister } from '../Components/LoginAndRegister';
import '../styles/globals.css';
import '../styles/Home.css';

function MyApp({ Component, pageProps }) {
  let user = 'Anon';
  const router = useRouter();
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

    if (localStorage.getItem('token') !== null && localStorage.getItem('token').length > 0) {
      setToken(localStorage.getItem('token'));
    } else {
      setToken('');
    }
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').length > 0) {
      user = jwtDecode(localStorage.getItem('token')).username;
      if (localStorage.getItem('userId') === null)
        localStorage.setItem('userId', jwtDecode(localStorage.getItem('token')).sub);
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

  const Logout = () => {
    localStorage.setItem('token', '');
    router.reload();
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
              {token.length > 0 && (
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
                  <Link href="/">
                    <MenuItem key="1">Wypożycz książkę</MenuItem>
                  </Link>
                  <MenuItem key="2">
                    <Typography textAlign="center">Zwróć książkę</Typography>
                  </MenuItem>
                  <Link href="/borrowedBooks">
                    <MenuItem key="3">
                      <Typography textAlign="center">Pokaż wypożyczone książki</Typography>
                    </MenuItem>
                  </Link>
                </Menu>
              )}
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
              <Link href="/">
                <MenuItem key="1">Wypożycz książkę</MenuItem>
              </Link>
              <MenuItem key="2">
                <Typography textAlign="center">Zwróć książkę</Typography>
              </MenuItem>
              <Link href="/borrowedBooks">
                <MenuItem key="3">
                  <Typography textAlign="center">Pokaż wypożyczone książki</Typography>
                </MenuItem>
              </Link>
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
                <MenuItem key="Ustawienia" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Ustawienia</Typography>
                </MenuItem>
                <MenuItem key="Wyloguj" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={() => Logout()}>
                    Wyloguj
                  </Typography>
                </MenuItem>
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
