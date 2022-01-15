import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export const MultiSearch = ({ data, valKey, addMore, setInputVal }) => {
  const [value, setValue] = useState('');

  return (
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
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
};
