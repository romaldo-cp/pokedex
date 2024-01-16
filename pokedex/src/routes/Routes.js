import React from "react";
import { Routes, Route } from "react-router-dom";
import PokemonList from "../views/PokemonList";
import PokemonDetail from "../views/PokemonDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  );
};

export default AppRoutes;
