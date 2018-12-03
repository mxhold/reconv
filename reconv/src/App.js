import React from 'react';
import { defaultIngredientDefinitions, defaultUnitDefinitions } from 'reconv-domain';
import RecipeInput from './components/recipe/RecipeInput';
import RecipeDefinitionsInputs from './components/definitions/RecipeDefinitionsInputs';

export default class App extends React.Component {
  state = {
    unitDefinitions: defaultUnitDefinitions.map( (unit) => {
      return unit.unit + "," + unit.mL
    }).join("\n"),
    ingredientDefinitions: defaultIngredientDefinitions.map( (ingredient) => {
      return ingredient.name + "," + ingredient.density
    }).join("\n"),
  };

  deserializeUnitDefinitions = (string) => {
    return string.split("\n").map(line => {
      let [unit, mL] = line.split(",");
      mL = Number.parseFloat(mL, 10);
      return { unit, mL };
    });
  }

  deserializeIngredientDefinitions = (string) => {
    return string.split("\n").map(line => {
      let [name, density] = line.split(",");
      density = Number.parseFloat(density, 10);
      return { name, density };
    });
  }

  handleUnitDefinitionsChange = (event) => {
    this.setState({unitDefinitions: event.target.value})
  }

  handleIngredientDefinitionsChange = (event) => {
    this.setState({ingredientDefinitions:  event.target.value})
  }

  render() {
    const lines = "1/2c butter\n1c sugar\n2 eggs, beaten\n3 bananas, crushed\n1 1/2c flour\n1t baking soda\n1/2t salt\n1/2t vanilla";
    const sparkleEmoji = <span role="img" aria-label="sparkle">✨</span>;

    return (
      <div>
        <h1>Recipe Converter</h1>
        <p>
          Paste a recipe below and watch as it is {sparkleEmoji}magically{sparkleEmoji} converted from US volumetric units to grams!
        </p>

        <RecipeInput
          value={lines}
          ingredientDefinitions={this.deserializeIngredientDefinitions(this.state.ingredientDefinitions)}
          unitDefinitions={this.deserializeUnitDefinitions(this.state.unitDefinitions)}
        />

        <RecipeDefinitionsInputs
          unitDefinitions={this.state.unitDefinitions}
          handleUnitDefinitionsChange={this.handleUnitDefinitionsChange}
          ingredientDefinitions={this.state.ingredientDefinitions}
          handleIngredientDefinitionsChange={this.handleIngredientDefinitionsChange}
        />
      </div>
    );
  }
}