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
import { getBookInfo } from '../../../API/getBook.tsx';
import { getBooksTags } from '../../../API/getTags';
import { getBooksGenres } from '../../../API/getBooksGenres';
import { MultiSearch } from '../../../Components/MultiSearch';
import { putModifyBook } from '../../../API/putModifyBook';
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
  const [authors, setAuthors] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [noOfPages, setNoOfPages] = useState('');
  const [language, setLanguage] = useState({});
  const [issueDate, setIssueDate] = useState('');
  const [publisher, setPublisher] = useState({});
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');
  const [tagsData, setTagsData] = useState([]);
  const [genresData, setGenresData] = useState({});
  const [languagesData, setLanguagesData] = useState([]);
  const [pusblishersData, setPublishersData] = useState([]);
  const router = useRouter();
  const localeMessages = locales[router.locale];
  const { id } = router.query;

  useEffect(() => {
    const getHints = async () => {
      const dane = await getBookInfo(id);
      const tagsFromApi = await getBooksTags();
      await setTagsData(tagsFromApi.data.tags);
      const genresFromApi = await getBooksGenres();
      await setGenresData(genresFromApi.data.genres);
      const getLanguageFromApi = await getLanguages();
      await setLanguagesData(getLanguageFromApi.data.languages);
      const getPublishersFromApi = await getPublishers();
      await setPublishersData(getPublishersFromApi.data.publishers);
      setTitle(dane.data.book.title);
      document.getElementById('title').value = dane.data.book.title;
      setIsbn(dane.data.book.isbn);
      document.getElementById('isbn').value = dane.data.book.isbn;
      let authorsStr = '';
      dane.data.book.authors.map((el, idx) => {
        if (idx > 0) {
          authorsStr += `,${el.firstName} ${el.lastName}`;
        } else {
          authorsStr += `${el.firstName} ${el.lastName}`;
        }
      });
      setAuthors(authorsStr);
      document.getElementById('authors').value = authorsStr;
      if (dane.data.book.description !== null && dane.data.book.description.length > 0) {
        setDescription(dane.data.book.description);
        document.getElementById('description').value = dane.data.book.description;
      }
      setGenre(dane.data.book.genre);
      setNoOfPages(dane.data.book.pages);
      document.getElementById('nopages').value = dane.data.book.pages;
      setLanguage(dane.data.book.language);
      setIssueDate(dane.data.book.issueDate);
      document.getElementById('issueDate').value = dane.data.book.issueDate;
      setTags(dane.data.book.tags);
      setType(dane.data.book.type);
      setPublisher(dane.data.book.publisher);
    };
    getHints();
  }, []);

  const setAuthorsFc = (val) => {
    const authorsArray = val.split(',');
    const authorsArrayOfObj = [];

    for (let i in authorsArray) {
      authorsArrayOfObj.push({
        firstName: authorsArray[i].split(' ')[0],
        lastName: authorsArray[i].split(' ')[1]
      });
    }
    return authorsArrayOfObj;
  };

  const submitButton = async () => {
    const token = localStorage.getItem('token');
    await putModifyBook(
      id,
      isbn,
      type,
      title,
      description,
      issueDate,
      publisher,
      setAuthorsFc(authors),
      genre,
      language,
      noOfPages,
      tags,
      token
    );
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
                      <TextField id="title" onChange={(e) => setTitle(e.target.value)} />
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
                      <TextField id="isbn" onChange={(e) => setIsbn(e.target.value)} />
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
                      <TextField id="authors" onChange={(e) => setAuthors(e.target.value)} />
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
                          id="description"
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
                      <TextField id="nopages" onChange={(e) => setNoOfPages(e.target.value)} />
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
                      <TextField id="issueDate" onChange={(e) => setIssueDate(e.target.value)} />
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
              onClick={() => submitButton()}
            >
              {localeMessages.EditBook}
            </Button>
          </Box>
        </Box>
      </div>
    </IntlProvider>
  );
};
