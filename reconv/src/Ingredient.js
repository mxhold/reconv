import React from 'react';

export default function Ingredient(props) {
  return (
    <div className="ingredient">
      <span className="ingredient-quantity">{props.quantity}</span><span className="ingredient-unit">{props.unit}</span> <span className="ingredient-name">{props.name}</span>
    </div>
  );
}
