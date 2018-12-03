import React from 'react';
import styles from "./RecipeInput.module.css";
import ConvertedRecipe from './ConvertedRecipe';

export default class RecipeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: props.recipe,
    };
  }

  handleChange = (event) => {
    this.setState({recipe: event.target.value});
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <h2>Recipe</h2>
          <textarea
            spellCheck="false"
            value={this.state.recipe}
            onChange={this.handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.output}>
          <h2>Converted Recipe</h2>
          <ConvertedRecipe
            recipe={this.state.recipe}
            ingredientDefinitions={this.props.ingredientDefinitions}
            unitDefinitions={this.props.unitDefinitions}
          />
        </div>
      </div>
    );
  }
}