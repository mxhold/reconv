import React from 'react';
import {Ingredient, MalformedIngredient} from './Ingredient.js';
import { parseIngredient, convertIngredient, convertIngredientError } from 'reconv-domain';
import styles from "./ConvertedRecipe.module.css";

export default function ConvertedRecipe(props) {
  const lines = props.lines;

  const ingredients = lines.split("\n").map((line, i) => {
    const parseResult = parseIngredient(line);
    if (parseResult.success) {
      let ingredient;
      const parsedIngredient = parseResult.result;
      const convertResult = convertIngredient(parsedIngredient, props.ingredientDefinitions, props.unitDefinitions);
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
    <div className={styles.convertedRecipe}>
      {ingredients}
    </div>
  );
}
