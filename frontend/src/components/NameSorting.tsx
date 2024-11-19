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
  const [lowestRatingSelected, setLowestRatingSelected] = React.useState<Checked>(false);
  const [highestRatingSelected, setHighestRatingSelected] = React.useState<Checked>(false);

  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (sortOption === "asc") setAscSelected(true)
    else if (sortOption === "desc") setDescSelected(true);
    else if (sortOption === "lowestRating") setLowestRatingSelected(true);
    else if (sortOption === "highestRating") setHighestRatingSelected(true);
  }, []);

  useEffect(() => {
    let orderBy: string = "";
    if (ascSelected) {
      orderBy = "asc"; 
    } else if (descSelected) {
      orderBy = "desc";
    } else if (lowestRatingSelected) {
      orderBy = "lowestRating";
    } else if (highestRatingSelected) {
      orderBy = "highestRating";
    }
    if (!isFirstRender.current || orderBy) {
    isFirstRender.current = false;
    }
    onSortChange(orderBy);
  }, [ascSelected, descSelected, lowestRatingSelected, highestRatingSelected]);

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
            if (checked) {
              setDescSelected(false);
              setLowestRatingSelected(false);
              setHighestRatingSelected(false);
            } 
          }}
        >
          A-Z
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={descSelected}
          onCheckedChange={(checked) => {
            setDescSelected(checked);
            if (checked) {
              setAscSelected(false);
              setLowestRatingSelected(false);
              setHighestRatingSelected(false);
            } 
          }}
        >
          Z-A
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          disabled={true} //enable when sorting on server for rating is fixed
          checked={highestRatingSelected}
          onCheckedChange={(checked) => {
            setHighestRatingSelected(checked);
            if (checked) {
              setAscSelected(false);
              setLowestRatingSelected(false);
              setDescSelected(false);
            } 
          }}
        >
          Highest Rating
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          disabled={true} //enable when sorting on server for rating is fixed
          checked={lowestRatingSelected}
          onCheckedChange={(checked) => {
            setLowestRatingSelected(checked);
            if (checked) {
              setAscSelected(false);
              setDescSelected(false);
              setHighestRatingSelected(false);
            } 
          }}
        >
          Lowest Rating
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NameSorting;
