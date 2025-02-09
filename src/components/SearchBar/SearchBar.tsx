import React from "react";

interface SearchBarProps {
  handleSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({handleSearch}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Buscar frase..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
