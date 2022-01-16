import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { IntlProvider } from 'react-intl';
import { getBooksTags } from '../../../API/getTags';
import { getBooksGenres } from '../../../API/getBooksGenres';
import { MultiSearch } from '../../../Components/MultiSearch';
import { postCreateBook } from '../../../API/postCreateBook';
import { getLanguages } from '../../../API/getLanguages';
import { getPublishers } from '../../../API/getPublishers';
import * as locales from '../../../content/locale';

const style = {
  marginTop: 10,
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  justifyContent: 'center'
};

export default () => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authors, setAuthors] = useState([]);
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState({});
  const [noOfPages, setNoOfPages] = useState('');
  const [language, setLanguage] = useState({});
  const [issueDate, setIssueDate] = useState('');
  const [publisher, setPublisher] = useState({});
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');
  const [tagsData, setTagsData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [pusblishersData, setPublishersData] = useState([]);
  const router = useRouter();
  const localeMessages = locales[router.locale];

  useEffect(() => {
    const getHints = async () => {
      const tagsFromApi = await getBooksTags();
      await setTagsData(tagsFromApi.data.tags);
      const genresFromApi = await getBooksGenres();
      await setGenresData(genresFromApi.data.genres);
      const getLanguageFromApi = await getLanguages();
      await setLanguagesData(getLanguageFromApi.data.languages);
      const getPublishersFromApi = await getPublishers();
      await setPublishersData(getPublishersFromApi.data.publishers);
    };
    getHints();
  }, []);

  const isValLengthTrue = () => {
    if (
      title.length > 0 &&
      isbn.length > 0 &&
      authors.length > 0 &&
      description.length > 0 &&
      Object.keys(genre).length > 0 &&
      noOfPages.length > 0 &&
      Object.keys(language).length > 0 &&
      issueDate.length > 0 &&
      Object.keys(publisher).length > 0 &&
      type.length > 0 &&
      tags.length > 0
    ) {
      return false;
    }
    return true;
  };

  const submitButton = async () => {
    const token = localStorage.getItem('token');
    await postCreateBook(
      isbn,
      type,
      title,
      description,
      issueDate,
      publisher,
      authors,
      genre,
      language,
      noOfPages,
      tags,
      token
    );
  };

  const setAuthorsFc = (val) => {
    const authorsArray = val.split(',');
    const authorsArrayOfObj = [];

    for (let i in authorsArray) {
      authorsArrayOfObj.push({
        firstName: authorsArray[i].split(' ')[0],
        lastName: authorsArray[i].split(' ')[1]
      });
    }
    setAuthors(authorsArrayOfObj);
  };

  const setTagsFc = (val) => {
    const tagsArr = val.split(',');
    const tagsArrayOfObj = [];

    for (let i in tagsArr) {
      tagsArrayOfObj.push({
        value: tagsArr[i]
      });
    }
    setTags(tagsArrayOfObj);
  };

  return (
    <IntlProvider locale={router.locale} defaultLocale={router.defaultLocale}>
      <div>
        <Box sx={style}>
          <Box>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.Title}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="ISBN"
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        onChange={(e) => setIsbn(e.target.value)}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.AutorsAfter}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        onChange={(e) => setAuthorsFc(e.target.value)}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={localeMessages.Description}
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <TextField
                          required
                          id="outlined-required"
                          label="Required"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Typography>
                    }
                  />
                </ListItem>
              </>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.Genre}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <MultiSearch
                        data={genresData}
                        valKey="value"
                        addMore
                        setInputVal={(val) => setGenre({ value: val })}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.NoOfPages}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        onChange={(e) => setNoOfPages(e.target.value)}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.Language}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <MultiSearch
                        data={languagesData}
                        valKey="value"
                        addMore
                        setInputVal={(val) => setLanguage({ value: val })}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.IssueDateEdit}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        onChange={(e) => setIssueDate(e.target.value)}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.Publisher}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <MultiSearch
                        data={pusblishersData}
                        valKey="name"
                        addMore
                        setInputVal={(val) => setPublisher({ name: val })}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.Type}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Typ"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <MenuItem value="book">Ksiązka</MenuItem>
                        <MenuItem value="article">Artykuł</MenuItem>
                      </Select>
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={localeMessages.TagsAfter}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <MultiSearch
                        data={tagsData}
                        valKey="value"
                        addMore
                        setInputVal={(val) => setTagsFc(val)}
                      />
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </List>
          </Box>
          <Box
            style={{
              height: 200,
              width: '100%',
              marginTop: 10,
              gridRowStart: 2,
              gridRowEnd: 3
            }}
          >
            <Button
              style={{ gridColumnStart: 2, gridColumnEnd: 3, marginLeft: 110 }}
              variant="contained"
              size="small"
              color="secondary"
              disabled={isValLengthTrue()}
              onClick={() => submitButton()}
            >
              {localeMessages.CreateBook}
            </Button>
          </Box>
        </Box>
      </div>
    </IntlProvider>
  );
};
