import { FormControl, TextField } from '@mui/material';
import React from 'react';

interface SearchProps {
  searchByName: string;
  onSearchChange: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchByName, onSearchChange }) => {
  return (
    <FormControl fullWidth variant="filled">
      <TextField
        id="standard-search"
        label="Search by name..."
        type="search"
        variant="filled"
        value={searchByName}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </FormControl>
  );
};

export default Search;
