import React from 'react';
import DefinitionsInput from "./DefinitionsInput";
import { defaultUnitDefinitions } from 'reconv-domain';

export default class UnitDefinitionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(value) {
    this.props.handleDefinitionChange(this.deserializeDefinitions(value));
  }

  deserializeDefinitions(string) {
    return string.split("\n").map(line => {
      let [unit, mL] = line.split(",");
      mL = Number.parseFloat(mL, 10);
      return { unit, mL };
    });
  }

  serializedDefaultDefinitions() {
    return defaultUnitDefinitions.map( (unit) => {
      return unit.unit + "," + unit.mL
    }).join("\n");
  }

  render() {
    return (
      <DefinitionsInput
        kind="Unit"
        csvFormat="unit,mL"
        value={this.serializedDefaultDefinitions()}
        handleValueChange={this.handleValueChange}
      />
    );
  }
}
