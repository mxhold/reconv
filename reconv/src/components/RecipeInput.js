import React from 'react';
import styles from "./RecipeInput.module.css";
import ConvertedRecipe from './ConvertedRecipe.js';

export default class RecipeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <h2>Recipe</h2>
          <textarea
            spellCheck="false"
            value={this.state.value}
            onChange={this.handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.output}>
          <h2>Converted Recipe</h2>
          <ConvertedRecipe lines={this.state.value} ingredientDefinitions={this.props.ingredientDefinitions} unitDefinitions={this.props.unitDefinitions} />
        </div>
      </div>
    );
  }
}
