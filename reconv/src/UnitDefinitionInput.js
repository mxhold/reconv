import React from 'react';
import IngredientDefinitionInput from './IngredientDefinitionInput';

export default class UnitDefinitionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.unitDefinitions,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  deserializeUnitDefinitions(string) {
    return string.split("\n").map(line => {
      let [unit, mL] = line.split(",");
      mL = Number.parseFloat(mL, 10);
      return { unit, mL };
    });
  }

  render() {
    return (
      <div className="unit-definition-input">
        <textarea spellCheck="false" value={this.state.value} onChange={this.handleChange} />
        <IngredientDefinitionInput lines={this.props.lines} ingredientDefinitions={this.props.ingredientDefinitions} unitDefinitions={this.deserializeUnitDefinitions(this.state.value)} />
      </div>
    );
  }
}
