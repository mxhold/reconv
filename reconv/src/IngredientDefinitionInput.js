import React from 'react';
import IngredientListInput from './IngredientListInput.js';

export default class IngredientDefinitionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.ingredientDefinitions,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
      <div className="ingredient-definition-input">
        <textarea spellCheck="false" value={this.state.value} onChange={this.handleChange} />
        <IngredientListInput ingredientDefinitions={this.deserializeIngredientDefinitions(this.state.value)} value={this.props.lines} unitDefinitions={this.props.unitDefinitions} />
      </div>
    );
  }
}
