import React, { useEffect, useRef } from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SortingProps {
  onSortChange: (orderBy: string) => void;
  sortOption: string | null;
}

const NameSorting: React.FC<SortingProps> = ({ onSortChange, sortOption }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>('');

  const isFirstRender = useRef(true);

  // Initialize the selected option based on the `sortOption` prop
  useEffect(() => {
    if (sortOption) {
      setSelectedOption(sortOption);
    }
  }, [sortOption]);

  // Notify the parent component whenever the selected option changes
  useEffect(() => {
    if (!isFirstRender.current || selectedOption) {
      onSortChange(selectedOption);
      isFirstRender.current = false;
    }
  }, [selectedOption]);

  // Handle the selection change
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-select-label">Choose sorting</InputLabel>
      <Select
        labelId="sort-select-label"
        value={selectedOption}
        onChange={handleChange}
        label="Choose sorting"
        sx={{width:"150px"}}
      >
        <MenuItem value="asc">A-Z</MenuItem>
        <MenuItem value="desc">Z-A</MenuItem>
        <MenuItem value="highestRating">
          Highest Rating
        </MenuItem>
        <MenuItem value="lowestRating">
          Lowest Rating
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default NameSorting;
