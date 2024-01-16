import React from "react";
import logo from "../assets/img/Pokeball.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="title">
        <strong>Pokédex</strong>{" "}
      </h1>
    </header>
  );
};

export default Header;
