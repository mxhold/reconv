import React from 'react';
import { Ingredient, MalformedIngredient } from './Ingredient';
import { parseIngredient, convertIngredient, convertIngredientError } from 'reconv-domain';
import styles from "./ConvertedRecipe.module.css";

export default function ConvertedRecipe(props) {
  const lines = props.lines;

  const ingredients = lines.split("\n").map((line, i) => {
    const parseResult = parseIngredient(line);
    if (parseResult.success) {
      const parsedIngredient = parseResult.result;
      const convertResult = convertIngredient(parsedIngredient, props.ingredientDefinitions, props.unitDefinitions);
      if (convertResult.success) {
        const convertedIngredient = convertResult.result;

        return <Ingredient
          key={i}
          quantity={convertedIngredient.quantity}
          unit={convertedIngredient.unit}
          name={convertedIngredient.name}
        />;
      } else {
        const conversionErrors = {
          unitNotFound: convertResult.errors.unit === convertIngredientError.UNRECOGNIZED,
          ingredientNotFound: convertResult.errors.ingredient === convertIngredientError.UNRECOGNIZED,
          badQuantity: convertResult.errors.quantity, // no need to distinguish between BAD_FORMAT and DIVIDE_BY_ZERO yet
          badUnitDefinition: convertResult.errors.unit === convertIngredientError.BAD_DEFINITION,
          badIngredientDefinition: convertResult.errors.ingredient === convertIngredientError.BAD_DEFINITION,
        }

        return <Ingredient
          key={i}
          quantity={parsedIngredient.quantity}
          unit={parsedIngredient.unit}
          name={parsedIngredient.name}
          errors={conversionErrors}
        />;
      }
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