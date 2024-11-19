import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react";

interface SortingProps {
  onSortChange: (orderBy: string) => void;
  sortOption: string | null;
}

const NameSorting: React.FC<SortingProps> = ({ onSortChange, sortOption }) => {
  type Checked = DropdownMenuCheckboxItemProps["checked"]
  
  const [ascSelected, setAscSelected] = React.useState<Checked>(false);
  const [descSelected, setDescSelected] = React.useState<Checked>(false);

  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (sortOption === "asc") setAscSelected(true)
    else if (sortOption === "desc") setDescSelected(true);
  }, []);

  useEffect(() => {
    let orderBy: string = "";
  
    if (ascSelected) {
      orderBy = "asc"; 
    } else if (descSelected) {
      orderBy = "desc";
    }
    
      if (!isFirstRender.current || orderBy) {
      isFirstRender.current = false;
    }
    
    onSortChange(orderBy);
  
  }, [ascSelected, descSelected]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Choose sorting</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={ascSelected}
          onCheckedChange={(checked) => {
            setAscSelected(checked);
            if (checked) setDescSelected(false);
          }}
        >
          A-Z
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={descSelected}
          onCheckedChange={(checked) => {
            setDescSelected(checked);
            if (checked) setAscSelected(false);
          }}
        >
          Z-A
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NameSorting;
