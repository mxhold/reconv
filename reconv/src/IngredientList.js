import React from 'react';
import {Ingredient, MalformedIngredient} from './Ingredient.js';
import { parseIngredient, convertIngredient, convertIngredientError } from 'reconv-domain';
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
            quantity: parsedIngredient.quantity,
            unit: parsedIngredient.unit,
            name: parsedIngredient.name,
            errors: {
              unitNotFound: errors.unit === convertIngredientError.UNRECOGNIZED,
              ingredientNotFound: errors.ingredient === convertIngredientError.UNRECOGNIZED,
              badQuantity: errors.quantity, // no need to distinguish between BAD_FORMAT and DIVIDE_BY_ZERO yet
              badUnitDefinition: errors.unit === convertIngredientError.BAD_DEFINITION,
              badIngredientDefinition: errors.ingredient === convertIngredientError.BAD_DEFINITION,
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
        errors={ingredient.errors}
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

