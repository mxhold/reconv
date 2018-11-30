import React from 'react';
import DefinitionsInput from "./DefinitionsInput";
import { defaultIngredientDefinitions } from 'reconv-domain';

export default class IngredientDefinitionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(value) {
    this.props.handleDefinitionChange(this.deserializeDefinitions(value));
  }

  deserializeDefinitions(string) {
    return string.split("\n").map(line => {
      let [name, density] = line.split(",");
      density = Number.parseFloat(density, 10);
      return { name, density };
    });
  }

  serializedDefaultDefinitions() {
    return defaultIngredientDefinitions.map( (ingredient) => {
      return ingredient.name + "," + ingredient.density
    }).join("\n");
  }

  render() {
    return (
      <DefinitionsInput
        kind="Ingredient"
        csvFormat="name,density"
        value={this.serializedDefaultDefinitions()}
        handleValueChange={this.handleValueChange}
      />
    );
  }
}
