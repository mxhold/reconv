import React from 'react';
import styles from "./RecipeDefinitionsInputs.module.css";
import DefinitionsInput from "./DefinitionsInput";

export default class RecipeDefinitionsInputs extends React.Component {
  state = {
    showDefinitions: false,
  };

  handleShowDefinitionsChange = (event) => {
    this.setState({showDefinitions: event.target.checked});
  }

  render() {
    let definitions = (
      <div className={styles.wrapper}>
        <div className={styles.child}>
          <DefinitionsInput
            kind="Unit"
            csvFormat="unit,mL"
            value={this.props.unitDefinitions}
            handleValueChange={this.props.handleUnitDefinitionsChange}
          />
        </div>

        <div className={styles.child}>
          <DefinitionsInput
              kind="Ingredient"
              csvFormat="name,density"
              value={this.props.ingredientDefinitions}
              handleValueChange={this.props.handleIngredientDefinitionsChange}
            />
        </div>
      </div>
    );

    return (
      <div>
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