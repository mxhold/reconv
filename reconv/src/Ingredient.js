import React from 'react';
import './Ingredient.css';

export function Ingredient(props) {
  let classNames = "ingredient";
  if (props.errors) {
    if (props.errors.unitNotFound) {
      classNames += " ingredient--unit-not-found";
    }
    if (props.errors.ingredientNotFound) {
      classNames += " ingredient--ingredient-not-found";
    }
    if (props.errors.badQuantity) {
      classNames += " ingredient--bad-quantity";
    }
    if (props.errors.badUnitDefinition) {
      classNames += " ingredient--bad-unit-definition";
    }
    if (props.errors.badIngredientDefinition) {
      classNames += " ingredient--bad-ingredient-definition";
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
