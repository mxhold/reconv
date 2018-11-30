import React from 'react';
import DefinitionsInput from "./DefinitionsInput";

export default class IngredientDefinitionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(value) {
    this.props.handleDefinitionsChange(this.deserializeDefinitions(value));
  }

  deserializeDefinitions(string) {
    return string.split("\n").map(line => {
      let [name, density] = line.split(",");
      density = Number.parseFloat(density, 10);
      return { name, density };
    });
  }

  serializeDefinitions(definitions) {
    return definitions.map( (ingredient) => {
      return ingredient.name + "," + ingredient.density
    }).join("\n");
  }

  render() {
    return (
      <DefinitionsInput
        kind="Ingredient"
        csvFormat="name,density"
        defaultValue={this.serializeDefinitions(this.props.defaultDefinitions)}
        handleValueChange={this.handleValueChange}
      />
    );
  }
}
