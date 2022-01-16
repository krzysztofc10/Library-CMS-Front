/* eslint-disable react/prop-types  */
/* eslint-disable react/jsx-props-no-spreading  */
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Head from 'next/head';
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
import { IntlProvider } from 'react-intl';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContrastIcon from '@mui/icons-material/Contrast';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import jwtDecode from 'jwt-decode';
import bookImg from '../Images/bookblue-open.svg';
import { colorHash } from '../Components/Helpers/colorName';
import { LoginAndRegister } from '../Components/LoginAndRegister';
import * as locales from '../content/locale';

import '../styles/globals.css';
import '../styles/Home.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mode, setMode] = useState('light');
  const [token, setToken] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const localeMessages = locales[router.locale];

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').length > 0) {
      localStorage.setItem('userId', jwtDecode(localStorage.getItem('token')).sub);
      localStorage.setItem('role', jwtDecode(localStorage.getItem('token')).role);
      localStorage.setItem(
        'userName',
        `${jwtDecode(localStorage.getItem('token')).firstName} ${
          jwtDecode(localStorage.getItem('token')).lastName
        }`
      );
    }
    if (localStorage.getItem('token') === null) {
      localStorage.setItem('role', '');
      localStorage.setItem('token', '');
    }
    if (localStorage.getItem('mode') === null) {
      localStorage.setItem('mode', 'light');
    } else {
      setMode(localStorage.getItem('mode'));
    }
    if (localStorage.getItem('role') !== null && localStorage.getItem('role').length > 0) {
      setUserRole(localStorage.getItem('role'));
    } else {
      setUserRole('');
    }
    if (localStorage.getItem('userName') !== null && localStorage.getItem('userName').length > 0) {
      setUserName(localStorage.getItem('userName'));
    } else {
      setUserName('');
    }
  }, [setToken]);

  const loginToApp = (tokenVal) => {
    setToken(tokenVal);
    setShowLogin(false);
    router.reload();
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

  const theme = useMemo(
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
    localStorage.setItem('role', '');
    router.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={router.locale} defaultLocale={router.defaultLocale}>
        <div style={{ height: '100' }}>
          <Head>
            <title>{localeMessages.libraryCms}</title>
          </Head>
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
                  {token.length === 0 && (
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
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
                        <MenuItem key="1" onClick={() => setShowLogin(false)}>
                          {localeMessages.mainPage}
                        </MenuItem>
                      </Link>
                      {userRole.length > 0 && (
                        <Link href="/borrowedBooks">
                          <MenuItem key="2">
                            <Typography textAlign="center">
                              {localeMessages.showBorowedBooks}
                            </Typography>
                          </MenuItem>
                        </Link>
                      )}
                      {token.length > 0 && (
                        <MenuItem key="3" onClick={() => setShowLogin(!showLogin)}>
                          <Typography textAlign="center">{localeMessages.loginRegister}</Typography>
                        </MenuItem>
                      )}
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
                    <MenuItem key="1" onClick={() => setShowLogin(false)}>
                      {localeMessages.mainPage}
                    </MenuItem>
                  </Link>
                  {userRole.length > 0 && (
                    <Link href="/borrowedBooks">
                      <MenuItem key="2">
                        <Typography textAlign="center">
                          {localeMessages.showBorowedBooks}
                        </Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {userRole.length === 0 && (
                    <MenuItem
                      key="3"
                      style={{ marginLeft: 110 }}
                      onClick={() => setShowLogin(!showLogin)}
                    >
                      <Typography textAlign="center">{localeMessages.loginRegister}</Typography>
                    </MenuItem>
                  )}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Otwórz ustawienia">
                    <>
                      <>
                        {router.locale === 'pl' ? (
                          <IconButton
                            type="button"
                            onClick={() => router.push(router.asPath, null, { locale: 'en' })}
                          >
                            EN
                          </IconButton>
                        ) : (
                          <IconButton
                            type="button"
                            onClick={() => router.push(router.asPath, null, { locale: 'pl' })}
                          >
                            PL
                          </IconButton>
                        )}
                        {token.length > 0 && (
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: colorHash(userName) }}>
                              {userName.match(/\b(\w)/g)}
                            </Avatar>
                          </IconButton>
                        )}
                      </>
                      {userRole.length > 0 && (
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar sx={{ bgcolor: colorHash(userName) }}>
                            {userName.match(/\b(\w)/g)}
                          </Avatar>
                        </IconButton>
                      )}
                      <IconButton onClick={toggleColorMode}>
                        <ContrastIcon sx={{ fontSize: 45 }} />
                        <span className="sr-only">Close</span>
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
                    <MenuItem key="Wyloguj" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" onClick={() => Logout()}>
                        {localeMessages.Logout}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          {showLogin ? (
            <LoginAndRegister loginFunc={(val) => loginToApp(val)} />
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </IntlProvider>
    </ThemeProvider>
  );
}
export default MyApp;
