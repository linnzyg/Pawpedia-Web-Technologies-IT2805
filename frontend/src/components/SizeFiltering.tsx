import React, { useEffect, useRef } from 'react';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select,} from '@mui/material';

interface FilteringProps {
  onFilterChange: (filters: string[]) => void;
  filterBySize: string[] | null;
}

const SizeFiltering: React.FC<FilteringProps> = ({ onFilterChange, filterBySize }) => {
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);

  const isFirstRender = useRef(true);

  // Initialize sizes based on `filterBySize` prop
  useEffect(() => {
    if (filterBySize) {
      setSelectedSizes(filterBySize);
    }
  }, [filterBySize]);

  // Update filters when selected sizes change
  useEffect(() => {
    if (!isFirstRender.current || selectedSizes.length > 0) {
      onFilterChange(selectedSizes);
      isFirstRender.current = false;
    }
  }, [selectedSizes]);

  const sizes = ['Small', 'Medium', 'Large', 'Giant'];

  const handleSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSizes(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="size-filter-label">Choose size</InputLabel>
      <Select
        labelId="size-filter-label"
        multiple
        value={selectedSizes}
        //@ts-ignore
        onChange={handleSizeChange}
        renderValue={(selected) => (selected as string[]).join(', ')} //Show selected sizes
        sx={{width:"200px"}}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            <Checkbox checked={selectedSizes.includes(size)} />
            <ListItemText primary={size + ' dogs'} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SizeFiltering;
