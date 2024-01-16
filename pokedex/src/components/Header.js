import React from "react";
import logo from "../assets/img/Pokeball.svg";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="title">
        <strong>Pokédex</strong>{" "}
      </h1>
      <SearchBar />
    </header>
  );
};

export default Header;
