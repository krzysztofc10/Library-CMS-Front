import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { postLogin } from '../API/postLogin.tsx';
import { postRegister } from '../API/postRegister.tsx';
import * as locales from '../content/locale';
import styles from '../styles/login.module.css';

export const LoginAndRegister = ({ loginFunc }) => {
  const router = useRouter();
  const localeMessages = locales[router.locale];
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const SubmitLogBtn = async () => {
    const res = await postLogin(Username, Password);
    localStorage.setItem('token', res.data.accessToken);
    loginFunc(res.data.accessToken);
  };

  const SubmitRegBtn = async () => {
    const res = await postRegister(FirstName, LastName, Username, Password, 'customer');
    if (res.status === 201) {
      setTimeout(() => setRegister(!register), 1000);
    }
  };

  const registerFunc = () => {
    setRegister(!register);
  };

  return (
    <IntlProvider locale={router.locale} defaultLocale={router.defaultLocale}>
      <div>
        {!register ? (
          <Paper elevation={15}>
            <div className={styles.login} style={{ marginTop: 100 }}>
              <h2 className={styles.loginHeader}>{localeMessages.Login}</h2>
              <TextField
                label="Email"
                type="text"
                className={styles.loginTextField1}
                autoComplete="current-password"
                value={Username}
                style={{ marginTop: 5, marginBottom: 10 }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label={localeMessages.Password}
                type="password"
                className={styles.loginTextField2}
                autoComplete="current-password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginTop: 30, marginBottom: 10 }}
              />
              <Button
                onClick={() => registerFunc()}
                variant="contained"
                color="secondary"
                className={styles.loginButton1}
                style={{ marginTop: 60, marginBottom: 50, width: 150 }}
              >
                {localeMessages.Register}
              </Button>
              <Button
                onClick={() => SubmitLogBtn()}
                variant="contained"
                color="secondary"
                className={styles.loginButton2}
                style={{ marginTop: 60, marginBottom: 50, width: 150 }}
              >
                {localeMessages.Submit}
              </Button>
            </div>
          </Paper>
        ) : (
          <Paper elevation={15} style={{ marginTop: 100 }}>
            <div className={styles.register}>
              <h1 className={styles.registerHeader}>{localeMessages.Register}</h1>
              <TextField
                label={localeMessages.FirstName}
                type="text"
                autoComplete="current-password"
                value={FirstName}
                className={styles.registerTextField1}
                style={{ marginTop: 5 }}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label={localeMessages.LastName}
                type="text"
                autoComplete="current-password"
                value={LastName}
                className={styles.registerTextField2}
                style={{ marginTop: 30 }}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="Email"
                type="text"
                autoComplete="current-password"
                value={Username}
                className={styles.registerTextField3}
                style={{ marginTop: 30 }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label={localeMessages.Password}
                type="password"
                autoComplete="current-password"
                value={Password}
                className={styles.registerTextField4}
                style={{ marginTop: 30 }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={() => registerFunc()}
                variant="contained"
                color="secondary"
                style={{ marginTop: 60, marginBottom: 50, width: 150 }}
                className={styles.registerButton1}
              >
                {localeMessages.Login}
              </Button>
              <Button
                onClick={() => SubmitRegBtn()}
                variant="contained"
                color="secondary"
                style={{ marginTop: 60, marginBottom: 50, width: 150 }}
                className={styles.registerButton2}
              >
                {localeMessages.Submit}
              </Button>
            </div>
          </Paper>
        )}
      </div>
    </IntlProvider>
  );
};
