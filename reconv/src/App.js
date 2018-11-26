import React, { Component } from 'react';
import './App.css';
import UnitDefinitionInput from './UnitDefinitionInput';

class App extends Component {
  render() {
    let ingredientDefinitions = "butter,0.9586114185\nwater,1";
    let unitDefinitions = "cup,237\nfloz,29.5725"

    let lines = "1/2c butter\n1.2c water\n1c malk\n1x butter\n1/0c water\n1BAD_DEFN water\n1c BAD_DEFN\nnonsense";

    return (
      <div>
        <UnitDefinitionInput lines={lines} ingredientDefinitions={ingredientDefinitions} unitDefinitions={unitDefinitions} />
      </div>
    );
  }
}

export default App;
