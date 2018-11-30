import React, { Component } from 'react';
import DefinitionInput from './components/DefinitionInput';
import { defaultIngredientDefinitions, defaultUnitDefinitions } from 'reconv-domain';
import UnitDefinitionsInput from './components/UnitDefinitionsInput';
import IngredientDefinitionsInput from './components/IngredientDefinitionsInput';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
  }

  handleDefinitionChange(definitions) {
    console.log(definitions);
  }

  render() {

    let ingredientDefinitions = defaultIngredientDefinitions.map( (ingredient) => { return ingredient.name + "," + ingredient.density }).join("\n");
    let unitDefinitions = defaultUnitDefinitions.map( (unit) => { return unit.unit + "," + unit.mL }).join("\n");

    let lines = "1/2c butter\n1c sugar\n2 eggs, beaten\n3 bananas, crushed\n1 1/2c flour\n1t baking soda\n1/2t salt\n1/2t vanilla";

    return (
      <div>
        <UnitDefinitionsInput handleDefinitionChange={this.handleDefinitionChange} />
        <IngredientDefinitionsInput handleDefinitionChange={this.handleDefinitionChange} />


        <h1>Recipe Converter</h1>
        <p>Paste a recipe below and watch as it is <span role="img" aria-label="sparkle">✨</span>magically<span role="img" aria-label="sparkle">✨</span> converted from US volumetric units to grams!</p>
        <DefinitionInput lines={lines} ingredientDefinitions={ingredientDefinitions} unitDefinitions={unitDefinitions} />
      </div>
    );
  }
}

export default App;
