import React from 'react';
import styles from "./RecipeDefinitionsInputs.module.css";
import UnitDefinitionsInput from './UnitDefinitionsInput';
import IngredientDefinitionsInput from './IngredientDefinitionsInput';

export default class RecipeDefinitionsInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDefinitions: false,
    };
  }

  handleShowDefinitionsChange = (event) => {
    this.setState({showDefinitions: event.target.checked});
  }

  render() {
    let definitions = (
      <div className={styles.wrapper}>
        <div className={styles.child}>
          <UnitDefinitionsInput
            handleDefinitionsChange={this.props.handleUnitDefinitionsChange}
            defaultDefinitions={this.props.defaultUnitDefinitions}
          />
        </div>

        <div className={styles.child}>
          <IngredientDefinitionsInput
            handleDefinitionsChange={this.props.handleIngredientDefinitionsChange}
            defaultDefinitions={this.props.defaultIngredientDefinitions}
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
