import React, { Component } from 'react';
import './App.css';
import IngredientListInput from './IngredientListInput.js';

class App extends Component {
  render() {
    return (
      <div>
        <IngredientListInput value={"1/2c butter\n1.2c water\n1c malk\n1x butter\n1/0c water\nnonsense"} />
      </div>
    );
  }
}

export default App;
