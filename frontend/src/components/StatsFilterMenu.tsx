import React, { useEffect, useRef } from 'react';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilteringProps {
  onStatsFilterChange: (filter: string[]) => void;
  filterByStat: string[] | null;
}

const StatsFilterMenu: React.FC<FilteringProps> = ({ onStatsFilterChange, filterByStat }) => {
  const [selectedOption, setSelectedOption] = React.useState<string[]>([]);

  const isFirstRender = useRef(true);

  // Initialize the selected option based on the `sortOption` prop
  useEffect(() => {
    if (filterByStat) {
      setSelectedOption(filterByStat);
    }
  }, [filterByStat]);

  // Notify the parent component whenever the selected option changes
  useEffect(() => {
    if (!isFirstRender.current || selectedOption.length > 0) {
      onStatsFilterChange(selectedOption);
      isFirstRender.current = false;
    }
  }, [selectedOption]);

  // Handle the selection change
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedOption(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id="statsfilter-select-label">Choose stats</InputLabel>
      <Select
        multiple
        labelId="statsfilter-select-label"
        value={selectedOption}
        onChange={handleChange}
        label="Choose stats filter"
        renderValue={(selected) => (selected as string[]).join(', ')}
        sx={{ width: '100%' }}
      >
        <MenuItem value="allergy">
          <Checkbox checked={selectedOption.includes('allergy')} />
          Allergy friendly
        </MenuItem>
        <MenuItem value="weight">
          <Checkbox checked={selectedOption.includes('weight')} />
          Allowed in Flight Cabin (Max 8 kg)
        </MenuItem>
        <MenuItem value="energy">
          <Checkbox checked={selectedOption.includes('energy')} />
          High energy
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default StatsFilterMenu;
