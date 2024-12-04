import { TextField } from '@mui/material';
import React from 'react';

interface SearchProps {
  searchByName: string;
  onSearchChange: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchByName, onSearchChange }) => {
  return (
    <TextField
      id="outlined-basic"
      type="text"
      placeholder="Search by name..."
      value={searchByName}
      onChange={(e) => onSearchChange(e.target.value)}
      variant="outlined"
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#211e1c' : 'white',
        borderRadius: '5px',
        width: '100%',
      })}
    />
  );
};

export default Search;
