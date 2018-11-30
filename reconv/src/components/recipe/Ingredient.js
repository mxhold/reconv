import React from 'react';
import styles from './Ingredient.module.css';

export function Ingredient(props) {
  let quantityClassName, unitClassName, ingredientClassName;
  if (props.errors) {
    if (props.errors.badQuantity) {
      quantityClassName = styles.badQuantity;
    }

    if (props.errors.unitNotFound) {
      unitClassName = styles.unitNotFound;
    }
    if (props.errors.badUnitDefinition) {
      unitClassName = styles.badUnitDefinition;
    }

    if (props.errors.ingredientNotFound) {
      ingredientClassName = styles.ingredientNotFound;
    }
    if (props.errors.badIngredientDefinition) {
      ingredientClassName = styles.badIngredientDefinition;
    }
  }

  return (
    <div>
      <span className={quantityClassName}>{props.quantity}</span><span className={unitClassName}>{props.unit}</span> <span className={ingredientClassName}>{props.name}</span>
    </div>
  );
}

export function MalformedIngredient(props) {
  return (
    <div>
      <span className={styles.malformed}>{props.string}</span>
    </div>
  );
}
