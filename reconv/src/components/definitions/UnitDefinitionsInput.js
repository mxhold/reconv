import React from 'react';
import DefinitionsInput from "./DefinitionsInput";

export default function UnitDefinitionsInput(props) {
  function handleValueChange(value) {
    props.handleDefinitionsChange(deserializeDefinitions(value));
  }

  function deserializeDefinitions(string) {
    return string.split("\n").map(line => {
      let [unit, mL] = line.split(",");
      mL = Number.parseFloat(mL, 10);
      return { unit, mL };
    });
  }

  function serializeDefinitions(definitions) {
    return definitions.map( (unit) => {
      return unit.unit + "," + unit.mL
    }).join("\n");
  }

  return (
    <DefinitionsInput
      kind="Unit"
      csvFormat="unit,mL"
      defaultValue={serializeDefinitions(props.defaultDefinitions)}
      handleValueChange={handleValueChange}
    />
  );
}