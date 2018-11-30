import React from 'react';
import { defaultIngredientDefinitions, defaultUnitDefinitions } from 'reconv-domain';
import RecipeInput from './components/recipe/RecipeInput.js';
import RecipeDefinitionsInputs from './components/definitions/RecipeDefinitionsInputs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitDefinitions: defaultUnitDefinitions,
      ingredientDefinitions: defaultIngredientDefinitions,
    };
    this.handleUnitDefinitionsChange = this.handleUnitDefinitionsChange.bind(this);
    this.handleIngredientDefinitionsChange = this.handleIngredientDefinitionsChange.bind(this);
  }

  handleUnitDefinitionsChange(definitions) {
    this.setState({unitDefinitions: definitions})
  }

  handleIngredientDefinitionsChange(definitions) {
    this.setState({ingredientDefinitions: definitions})
  }

  render() {
    let lines = "1/2c butter\n1c sugar\n2 eggs, beaten\n3 bananas, crushed\n1 1/2c flour\n1t baking soda\n1/2t salt\n1/2t vanilla";
    let sparkleEmoji = <span role="img" aria-label="sparkle">✨</span>;

    return (
      <div>
        <h1>Recipe Converter</h1>
        <p>
          Paste a recipe below and watch as it is {sparkleEmoji}magically{sparkleEmoji} converted from US volumetric units to grams!
        </p>

        <RecipeInput
          value={lines}
          ingredientDefinitions={this.state.ingredientDefinitions}
          unitDefinitions={this.state.unitDefinitions}
        />

        <RecipeDefinitionsInputs
          defaultUnitDefinitions={this.state.unitDefinitions}
          handleUnitDefinitionsChange={this.handleUnitDefinitionsChange}
          defaultIngredientDefinitions={this.state.ingredientDefinitions}
          handleIngredientDefinitionsChange={this.handleIngredientDefinitionsChange}
        />
      </div>
    );
  }
}

export default App;
