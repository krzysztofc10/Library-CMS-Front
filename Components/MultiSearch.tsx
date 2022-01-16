import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import * as locales from '../content/locale';

const filter = createFilterOptions();

export const MultiSearch = ({ data, valKey, addMore, setInputVal }) => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const localeMessages = locales[router.locale];

  return (
    <IntlProvider locale={router.locale} defaultLocale={router.defaultLocale}>
      <Autocomplete
        value={value}
        onChange={async (event, newValue) => {
          if (newValue !== null) {
            await setValue(newValue[valKey]);
            await setInputVal(newValue[valKey]);
          } else {
            await setValue('');
            await setInputVal('');
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value

          const isExisting = options.some((option) => inputValue === option[valKey]);
          if (inputValue !== '' && !isExisting && addMore) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={data}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option[valKey];
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option[valKey]}
          </li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label={localeMessages.Search} />}
      />
    </IntlProvider>
  );
};
