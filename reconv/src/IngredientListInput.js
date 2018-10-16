import React from 'react';
import {Ingredient, MalformedIngredient} from './Ingredient.js';
import parseIngredient from './parseIngredient.js';

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
    const lines = this.state.value;

    const ingredients = lines.split("\n").map((line, i) => {
      const ingredientData = parseIngredient(line);
      if (ingredientData == null) {
        return <MalformedIngredient key={i} string={line} />;
      } else {
        const ingredient = ingredientData;
        return <Ingredient key={i} quantity={ingredient.quantity} unit={ingredient.unit} name={ingredient.name} />;
      }
    });

    return (
      <div>
        <textarea value={this.state.value} onChange={this.handleChange} />
        {ingredients}
      </div>
    );
  }
}
