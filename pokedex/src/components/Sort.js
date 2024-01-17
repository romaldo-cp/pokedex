import React, { useState } from "react";

const Sort = ({ onSortChange }) => {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("number");

  const handleSortClick = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortOptionClick = (option) => {
    setSelectedOption(option);
    onSortChange(option);
    setShowSortOptions(false);
  };

  const getSortSymbol = () => {
    if (selectedOption === "number") {
      return "#";
    } else if (selectedOption === "name") {
      return <span style={{ textDecoration: "underline" }}>A</span>;
    }
    return null;
  };

  return (
    <div className="sort-container">
      <div className="sort-icon" onClick={handleSortClick}>
        {getSortSymbol()}
      </div>
      {showSortOptions && (
        <div className="sort-card">
          <span className="sort-title">
            <strong>Ordenar por:</strong>
          </span>
          <div className="sort-options">
            <label>
              <input
                type="radio"
                name="sort-option"
                value="number"
                checked={selectedOption === "number"}
                onChange={() => handleSortOptionClick("number")}
              />
              Número
            </label>
            <label>
              <input
                type="radio"
                name="sort-option"
                value="name"
                checked={selectedOption === "name"}
                onChange={() => handleSortOptionClick("name")}
              />
              Nombre
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
