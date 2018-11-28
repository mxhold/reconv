import React, { Component } from 'react';
import DefinitionInput from './components/DefinitionInput';
import { defaultIngredientDefinitions, defaultUnitDefinitions } from 'reconv-domain';

class App extends Component {
  render() {

    let ingredientDefinitions = defaultIngredientDefinitions.map( (ingredient) => { return ingredient.name + "," + ingredient.density }).join("\n");
    let unitDefinitions = defaultUnitDefinitions.map( (unit) => { return unit.unit + "," + unit.mL }).join("\n");

    let lines = "1/2c butter\n1.2c water\n1c malk\n1x butter\n1/0c water";

    return (
      <div>
        <h1>Recipe Converter</h1>
        <p>Paste a recipe below and watch as it is <span role="img" aria-label="sparkle">✨</span>magically<span role="img" aria-label="sparkle">✨</span> converted from US volumetric units to grams!</p>
        <DefinitionInput lines={lines} ingredientDefinitions={ingredientDefinitions} unitDefinitions={unitDefinitions} />
      </div>
    );
  }
}

export default App;
