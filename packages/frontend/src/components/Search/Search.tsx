import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { searchStyle } from './search.styles';

interface ISearchProps {
    handleChangeSymbol: (symbol: string) => void;
    options: string[];
    value: string;
}

function Search({handleChangeSymbol, options, value}: ISearchProps){
  return (
    <Autocomplete
        disablePortal
        options={options}
        renderInput={(params) => <TextField {...params} label="Please select a ticker" />}
        className={searchStyle}
        onChange={(event, symbol) => {
          handleChangeSymbol(symbol || '')
        }}
        defaultValue={value}
    />
  );
}

export default Search;
