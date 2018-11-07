import React, { Component } from 'react';
import './App.css';
import IngredientDefinitionInput from './IngredientDefinitionInput';

class App extends Component {
  render() {
    let ingredientDefinitions = "butter,0.9586114185\nwater,1";

    let lines = "1/2c butter\n1.2c water\n1c malk\n1x butter\n1/0c water\n1BAD_DEFN water\n1c BAD_DEFN\nnonsense";

    return (
      <div>
        <IngredientDefinitionInput lines={lines} ingredientDefinitions={ingredientDefinitions} />
      </div>
    );
  }
}

export default App;
