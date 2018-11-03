import React from 'react';
import {Ingredient, MalformedIngredient} from './Ingredient.js';
import { parseIngredient } from 'reconv-domain';
import convertIngredient from './convertIngredient.js';
import "./IngredientList.css";

export default function IngredientList(props) {
  const lines = props.lines;

  const ingredients = lines.split("\n").map((line, i) => {
    const parseResult = parseIngredient(line);
    if (parseResult.success) {
      const ingredientData = parseResult.result;
      const ingredient = props.convert ? convertIngredient(ingredientData) : ingredientData;
      return <Ingredient
        key={i}
        quantity={ingredient.quantity}
        unit={ingredient.unit}
        name={ingredient.name}
        metadata={ingredient.metadata}
        />;
    } else {
      return <MalformedIngredient key={i} string={line} />;
    }
  });

  return (
    <div className="ingredient-list">
      {ingredients}
    </div>
  );
}

