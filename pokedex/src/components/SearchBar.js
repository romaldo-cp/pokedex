import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ setSearchTerm }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-section">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Buscar Pokémon"
          className="search-input"
          onChange={handleSearchChange}
          onFocus={(e) => e.target.select()}
        />
      </div>
    </div>
  );
};

export default SearchBar;
