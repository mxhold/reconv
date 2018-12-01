import React from 'react';
import DefinitionsInput from "./DefinitionsInput";

export default function IngredientDefinitionsInput(props) {
  function handleValueChange(value) {
    props.handleDefinitionsChange(deserializeDefinitions(value));
  }

  function deserializeDefinitions(string) {
    return string.split("\n").map(line => {
      let [name, density] = line.split(",");
      density = Number.parseFloat(density, 10);
      return { name, density };
    });
  }

  function serializeDefinitions(definitions) {
    return definitions.map( (ingredient) => {
      return ingredient.name + "," + ingredient.density
    }).join("\n");
  }


  return (
    <DefinitionsInput
      kind="Ingredient"
      csvFormat="name,density"
      defaultValue={serializeDefinitions(props.defaultDefinitions)}
      handleValueChange={handleValueChange}
    />
  );
}