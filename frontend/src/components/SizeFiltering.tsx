import * as React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect } from 'react';

interface FilteringProps {
  onFilterChange: (filters: string[]) => void;
  filterBySize: string[] | null;
}

const SizeFiltering: React.FC<FilteringProps> = ({ onFilterChange, filterBySize }) => {
  type Checked = DropdownMenuCheckboxItemProps['checked'];
  const [smallSelected, setSmallSelected] = React.useState<Checked>(false);
  const [mediumSelected, setMediumSelected] = React.useState<Checked>(false);
  const [largeSelected, setLargeSelected] = React.useState<Checked>(false);
  const [giantSelected, setGiantSelected] = React.useState<Checked>(false);

  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (filterBySize?.includes('Small')) setSmallSelected(true);
    if (filterBySize?.includes('Medium')) setMediumSelected(true);
    if (filterBySize?.includes('Large')) setLargeSelected(true);
    if (filterBySize?.includes('Giant')) setGiantSelected(true);
  }, []);

  useEffect(() => {
    const filters: string[] = [];
    if (smallSelected) {
      filters.push('Small');
      filters.push('small');
    }
    if (mediumSelected) {
      filters.push('Medium');
      filters.push('medium');
    }
    if (largeSelected) {
      filters.push('Large');
      filters.push('large');
    }
    if (giantSelected) {
      filters.push('Giant');
      filters.push('giant');
    }

    if (filters.length > 0 || !isFirstRender.current) {
      onFilterChange(filters);
      isFirstRender.current = false;
    }
  }, [smallSelected, mediumSelected, largeSelected, giantSelected]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Choose size</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={smallSelected} onCheckedChange={setSmallSelected}>
          Small dogs
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={mediumSelected} onCheckedChange={setMediumSelected}>
          Medium dogs
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={largeSelected} onCheckedChange={setLargeSelected}>
          Large dogs
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={giantSelected} onCheckedChange={setGiantSelected}>
          Giant dogs
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SizeFiltering;
