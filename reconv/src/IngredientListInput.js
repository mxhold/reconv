import React from 'react';
import "./IngredientListInput.css";
import IngredientList from './IngredientList.js';

export default class IngredientListInput extends React.Component {
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
      <div className="ingredient-list-input">
        <div className="recipe-input">
          <h2>Recipe</h2>
          <textarea spellCheck="false" value={this.state.value} onChange={this.handleChange} />
        </div>
        <div className="recipe-output">
          <h2>Converted Recipe</h2>
          <IngredientList lines={this.state.value} ingredientDefinitions={this.props.ingredientDefinitions} unitDefinitions={this.props.unitDefinitions} />
        </div>
      </div>
    );
  }
}
