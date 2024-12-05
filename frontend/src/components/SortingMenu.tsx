import React, { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SortingProps {
  onSortChange: (orderBy: string) => void;
  sortOption: string | null;
}

const NameSorting: React.FC<SortingProps> = ({ onSortChange, sortOption }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>('');

  // Initialize the selected option based on the `sortOption` prop
  useEffect(() => {
    setSelectedOption(sortOption || '');
  }, [sortOption]);


  // Handle the selection change
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedOption(value); 
    onSortChange(value);
  };

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id="sort-select-label">Choose sorting</InputLabel>
      <Select
        labelId="sort-select-label"
        value={selectedOption}
        onChange={handleChange}
        label="Choose sorting"
        sx={{ width: '100%' }}
      >
        <MenuItem value="asc">A-Z</MenuItem>
        <MenuItem value="desc">Z-A</MenuItem>
        <MenuItem value="highestRating">Highest Rating</MenuItem>
        <MenuItem value="lowestRating">Lowest Rating</MenuItem>
        <MenuItem value="lifespan">Longest lifespan</MenuItem>
        <MenuItem value="trainability">Highest trainability</MenuItem>
        <MenuItem value="friendliness">Most friendly</MenuItem>
      </Select>
    </FormControl>
  );
};

export default NameSorting;
