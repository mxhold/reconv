import React from 'react';
import {Ingredient, MalformedIngredient} from './Ingredient.js';
import { parseIngredient, convertIngredient } from 'reconv-domain';
import "./IngredientList.css";

export default function IngredientList(props) {
  const lines = props.lines;

  const ingredients = lines.split("\n").map((line, i) => {
    const parseResult = parseIngredient(line);
    if (parseResult.success) {
      let ingredient;
      if (props.convert) {
        const parsedIngredient = parseResult.result;
        const convertResult = convertIngredient(parsedIngredient);
        if (convertResult.success) {
          ingredient = convertResult.result;
        } else {
          const errors = convertResult.errors;

          ingredient = {
            quantity: errors.quantity ? "NaN" : parsedIngredient.quantity,
            unit: parsedIngredient.unit,
            name: parsedIngredient.name,
            metadata: {
              unitFound: !errors.unit,
              ingredientFound: !errors.ingredient,
            }
          }
        }
      } else {
        ingredient = parseResult.result;
      }
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

