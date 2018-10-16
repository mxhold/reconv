import React from 'react';
import './Ingredient.css';

export function Ingredient(props) {
  return (
    <div className="ingredient">
      <span className="ingredient-quantity">{props.quantity}</span><span className="ingredient-unit">{props.unit}</span> <span className="ingredient-name">{props.name}</span>
    </div>
  );
}

export function MalformedIngredient(props) {
  return (
    <div className="ingredient">
      <span className="ingredient--malformed">{props.string}</span>
    </div>
  );
}
