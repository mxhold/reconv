import React from 'react';
import IngredientListInput from './IngredientListInput.js';
import styles from "./DefinitionInput.module.css";

export default class DefinitionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitDefinitions: props.unitDefinitions,
      ingredientDefinitions: props.ingredientDefinitions,
      showDefinitions: false,
    };

    this.handleUnitDefinitionChange = this.handleUnitDefinitionChange.bind(this);
    this.handleIngredientDefinitionChange = this.handleIngredientDefinitionChange.bind(this);
    this.handleShowDefinitionsChange = this.handleShowDefinitionsChange.bind(this);
  }

  handleUnitDefinitionChange(event) {
    this.setState({unitDefinitions: event.target.value});
  }

  handleIngredientDefinitionChange(event) {
    this.setState({ingredientDefinitions: event.target.value});
  }

  handleShowDefinitionsChange(event) {
    this.setState({showDefinitions: event.target.checked});
  }

  deserializeUnitDefinitions(string) {
    return string.split("\n").map(line => {
      let [unit, mL] = line.split(",");
      mL = Number.parseFloat(mL, 10);
      return { unit, mL };
    });
  }

  deserializeIngredientDefinitions(string) {
    return string.split("\n").map(line => {
      let [name, density] = line.split(",");
      density = Number.parseFloat(density, 10);
      return { name, density };
    });
  }

  render() {
    let definitions;
    if (this.state.showDefinitions) {
      definitions = (
        <div className={styles.wrapper}>
          <div className={styles.child}>
            <h2>Unit definitions</h2>
            <p className={styles.definitionFormatExample}>unit,mL</p>
            <textarea
              spellCheck="false"
              value={this.state.unitDefinitions}
              onChange={this.handleUnitDefinitionChange}
              className={styles.definitionField}
            />
          </div>

          <div className={styles.child}>
            <h2>Ingredient definitions</h2>
            <p className={styles.definitionFormatExample}>ingredient,density</p>
            <textarea
              spellCheck="false"
              value={this.state.ingredientDefinitions}
              onChange={this.handleIngredientDefinitionChange}
              className={styles.definitionField}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <IngredientListInput
        value={this.props.lines}
        ingredientDefinitions={this.deserializeIngredientDefinitions(this.state.ingredientDefinitions)}
        unitDefinitions={this.deserializeUnitDefinitions(this.state.unitDefinitions)}
        />

        <div className={styles.showDefinitionsToggle}>
          <label>
            <input type="checkbox" value={this.state.showDefinitions} onChange={this.handleShowDefinitionsChange} />
            Show unit/ingredient definitions
          </label>
        </div>
        {definitions}
      </div>
    );
  }
}
