import React from 'react';
import Ingredient from './Ingredient.js'

export default function IngredientList(props) {
  const ingredients = props.ingredients;
  return ingredients.map((ingredient, i) =>
    <Ingredient key={i} quantity={ingredient.quantity} unit={ingredient.unit} name={ingredient.name} />
  );
}

