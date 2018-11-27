import React from 'react';
import IngredientListInput from './IngredientListInput.js';

export default class DefinitionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitDefinitions: props.unitDefinitions,
      ingredientDefinitions: props.ingredientDefinitions,
    };

    this.handleUnitDefinitionChange = this.handleUnitDefinitionChange.bind(this);
    this.handleIngredientDefinitionChange = this.handleIngredientDefinitionChange.bind(this);
  }

  handleUnitDefinitionChange(event) {
    this.setState({unitDefinitions: event.target.value});
  }

  handleIngredientDefinitionChange(event) {
    this.setState({ingredientDefinitions: event.target.value});
  }

  deserializeUnitDefinitions(string) {
    return string.split("\n").map(line => {
      let [unit, mL] = line.split(",");
      mL = Number.parseFloat(mL, 10);
      return { unit, mL };
    });
  }

  deserializeIngredientDefinitions(string) {
    return string.split("\n").map(line => {
      let [name, density] = line.split(",");
      density = Number.parseFloat(density, 10);
      return { name, density };
    });
  }

  render() {
    return (
      <div className="definition-input">
        <div className="unit-definition-input">
          <h2>Units</h2>
          <textarea spellCheck="false" value={this.state.unitDefinitions} onChange={this.handleUnitDefinitionChange} />
        </div>

        <div className="ingredient-definition-input">
          <h2>Ingredients</h2>
          <textarea spellCheck="false" value={this.state.ingredientDefinitions} onChange={this.handleIngredientDefinitionChange} />
        </div>

        <IngredientListInput
        value={this.props.lines}
        ingredientDefinitions={this.deserializeIngredientDefinitions(this.state.ingredientDefinitions)}
        unitDefinitions={this.deserializeUnitDefinitions(this.state.unitDefinitions)}
        />
      </div>
    );
  }
}
