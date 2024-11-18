import React from 'react';

interface SearchProps {
  searchByName: string;
  onSearchChange: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchByName, onSearchChange }) => {
  return (
    <section id="secondRow">
      <input
        type="text"
        placeholder="Search..."
        value={searchByName}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </section>
  );
};

export default Search;
