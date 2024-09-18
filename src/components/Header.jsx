// components/Header.jsx

import React from 'react';

const Header = ({ score, topScore }) => {
  return (
    <header>
      <h2>Score: {score}</h2>
      <h1>Pokemon: Gotta Catch'Em All!</h1> 
      <h2>Top Score: {topScore}</h2>
    </header>
  );
};

export default Header;