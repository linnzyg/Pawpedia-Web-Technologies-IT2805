import { TextField } from '@mui/material';
import React from 'react';

interface SearchProps {
  searchByName: string;
  onSearchChange: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchByName, onSearchChange }) => {
  return (
    <section id="secondRow">
      <TextField
        id="outlined-basic"
        type="text"
        placeholder="Search..."
        value={searchByName}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        sx={(theme) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#39342b' : 'white',
          borderRadius: "5px"
        })}
      />
    </section>
  );
};

export default Search;
