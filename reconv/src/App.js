import React, { Component } from 'react';
import './App.css';
import IngredientList from './IngredientList.js';

class App extends Component {
  render() {
    const ingredients = [
      { quantity: "1/2", unit: "c", name: "butter" },
      { quantity: "1", unit: "c", name: "sugar" },
    ];
    return (
      <IngredientList ingredients={ingredients} />
    );
  }
}

export default App;
