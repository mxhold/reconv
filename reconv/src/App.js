import React, { Component } from 'react';
import './App.css';
import DefinitionInput from './DefinitionInput';
import { defaultIngredientDefinitions, defaultUnitDefinitions } from 'reconv-domain';

class App extends Component {
  render() {

    let ingredientDefinitions = defaultIngredientDefinitions.map( (ingredient) => { return ingredient.name + "," + ingredient.density }).join("\n");
    let unitDefinitions = defaultUnitDefinitions.map( (unit) => { return unit.unit + "," + unit.mL }).join("\n");

    let lines = "1/2c butter\n1.2c water\n1c malk\n1x butter\n1/0c water\n1BAD_DEFN water\n1c BAD_DEFN\nnonsense";

    return (
      <div>
        <h1>Recipe Converter</h1>
        <DefinitionInput lines={lines} ingredientDefinitions={ingredientDefinitions} unitDefinitions={unitDefinitions} />
      </div>
    );
  }
}

export default App;
