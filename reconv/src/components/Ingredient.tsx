import * as React from 'react';
// import './Ingredient.css';

export interface Props {
    quantity: string;
    unit: string;
    name: string;
    unitFound: boolean;
    ingredientFound: boolean;
}

export function Ingredient({ quantity, unit, name, unitFound = true, ingredientFound = false }: Props) {
  let classNames = "ingredient";
  if (!unitFound) {
    classNames += " ingredient--unit-not-found";
  }
  if (!ingredientFound) {
    classNames += " ingredient--ingredient-not-found";
  }

  return (
    <div className={classNames}>
      {formatQuantity(quantity)}<span className="ingredient-unit">{unit}</span> <span className="ingredient-name">{name}</span>
    </div>
  );
}

export interface MalformedProps {
  input: string;
}

export function MalformedIngredient({ input }: MalformedProps) {
  return (
    <div className="ingredient">
      <span className="ingredient--malformed">{input}</span>
    </div>
  );
}

function formatQuantity(quantity: string) {
  let classNames = "ingredient-quantity";
  if (quantity === "NaN") {
    classNames += " ingredient-quantity--nan";
  }
  return <span className={classNames}>{quantity}</span>;
}
