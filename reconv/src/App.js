import React from 'react';
import { defaultIngredientDefinitions, defaultUnitDefinitions } from 'reconv-domain';
import UnitDefinitionsInput from './components/UnitDefinitionsInput';
import IngredientDefinitionsInput from './components/IngredientDefinitionsInput';
import IngredientListInput from './components/IngredientListInput.js';
import styles from "./App.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDefinitions: false,
      unitDefinitions: defaultUnitDefinitions,
      ingredientDefinitions: defaultIngredientDefinitions,
    }
    this.handleUnitDefinitionsChange = this.handleUnitDefinitionsChange.bind(this);
    this.handleIngredientDefinitionsChange = this.handleIngredientDefinitionsChange.bind(this);
    this.handleShowDefinitionsChange = this.handleShowDefinitionsChange.bind(this);
  }

  handleUnitDefinitionsChange(definitions) {
    this.setState({unitDefinitions: definitions})
  }

  handleIngredientDefinitionsChange(definitions) {
    this.setState({ingredientDefinitions: definitions})
  }

  handleShowDefinitionsChange(event) {
    this.setState({showDefinitions: event.target.checked});
  }

  render() {
    let lines = "1/2c butter\n1c sugar\n2 eggs, beaten\n3 bananas, crushed\n1 1/2c flour\n1t baking soda\n1/2t salt\n1/2t vanilla";

    let definitions = (
      <div className={styles.wrapper}>
        <div className={styles.child}>
          <UnitDefinitionsInput
            handleDefinitionsChange={this.handleUnitDefinitionsChange}
            defaultDefinitions={this.state.unitDefinitions}
          />
        </div>

        <div className={styles.child}>
          <IngredientDefinitionsInput
            handleDefinitionsChange={this.handleIngredientDefinitionsChange}
            defaultDefinitions={this.state.ingredientDefinitions}
          />
        </div>
      </div>
    );

    return (
      <div>
        <h1>Recipe Converter</h1>
        <p>Paste a recipe below and watch as it is <span role="img" aria-label="sparkle">✨</span>magically<span role="img" aria-label="sparkle">✨</span> converted from US volumetric units to grams!</p>

        <IngredientListInput
          value={lines}
          ingredientDefinitions={this.state.ingredientDefinitions}
          unitDefinitions={this.state.unitDefinitions}
        />

        <div className={styles.showDefinitionsToggle}>
          <label>
            <input type="checkbox" value={this.state.showDefinitions} onChange={this.handleShowDefinitionsChange} />
            Show unit/ingredient definitions
          </label>
        </div>
        { this.state.showDefinitions ? definitions : null}
      </div>
    );
  }
}

export default App;
