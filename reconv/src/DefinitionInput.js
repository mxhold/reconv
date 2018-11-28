import React from 'react';
import IngredientListInput from './IngredientListInput.js';
import "./DefinitionInput.css";

export default class DefinitionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitDefinitions: props.unitDefinitions,
      ingredientDefinitions: props.ingredientDefinitions,
      showDefinitions: false,
    };

    this.handleUnitDefinitionChange = this.handleUnitDefinitionChange.bind(this);
    this.handleIngredientDefinitionChange = this.handleIngredientDefinitionChange.bind(this);
    this.handleShowDefinitionsChange = this.handleShowDefinitionsChange.bind(this);
  }

  handleUnitDefinitionChange(event) {
    this.setState({unitDefinitions: event.target.value});
  }

  handleIngredientDefinitionChange(event) {
    this.setState({ingredientDefinitions: event.target.value});
  }

  handleShowDefinitionsChange(event) {
    this.setState({showDefinitions: event.target.checked});
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
    let definitions;
    if (this.state.showDefinitions) {
      definitions = (
        <div>
          <div className="unit-definition-input">
            <h2>Unit definitions</h2>
            <p className="definition-format-example">unit,mL</p>
            <textarea spellCheck="false" value={this.state.unitDefinitions} onChange={this.handleUnitDefinitionChange} />
          </div>

          <div className="ingredient-definition-input">
            <h2>Ingredient definitions</h2>
            <p className="definition-format-example">ingredient,density</p>
            <textarea spellCheck="false" value={this.state.ingredientDefinitions} onChange={this.handleIngredientDefinitionChange} />
          </div>
        </div>
      );
    }

    return (
      <div className="definition-input">
        <IngredientListInput
        value={this.props.lines}
        ingredientDefinitions={this.deserializeIngredientDefinitions(this.state.ingredientDefinitions)}
        unitDefinitions={this.deserializeUnitDefinitions(this.state.unitDefinitions)}
        />

        <div className="show-definition">
          <label>
            <input type="checkbox" value={this.state.showDefinitions} onChange={this.handleShowDefinitionsChange} />
            Show unit/ingredient definitions
          </label>
        </div>
        {definitions}
      </div>
    );
  }
}
