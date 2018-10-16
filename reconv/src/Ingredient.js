import React from 'react';
import './Ingredient.css';

export function Ingredient(props) {
  let classNames = "ingredient";
  if (props.metadata) {
    if (!props.metadata.unitFound) {
      classNames += " ingredient--unit-not-found";
    }
    if (!props.metadata.ingredientFound) {
      classNames += " ingredient--ingredient-not-found";
    }
  }

  return (
    <div className={classNames}>
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
