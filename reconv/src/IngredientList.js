import React from 'react';
import {Ingredient, MalformedIngredient} from './Ingredient.js';
import parseIngredient from './parseIngredient.js';
import convertIngredient from './convertIngredient.js';
import "./IngredientList.css";

export default function IngredientList(props) {
  const lines = props.lines;

  const ingredients = lines.split("\n").map((line, i) => {
    const ingredientData = parseIngredient(line);
    if (ingredientData == null) {
      return <MalformedIngredient key={i} string={line} />;
    } else {
      const ingredient = props.convert ? convertIngredient(ingredientData) : ingredientData;
      return <Ingredient key={i} quantity={ingredient.quantity} unit={ingredient.unit} name={ingredient.name} />;
    }
  });

  return (
    <div className="ingredient-list">
      {ingredients}
    </div>
  );
}

