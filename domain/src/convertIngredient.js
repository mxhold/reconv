var Fraction = require('fraction.js');

var convertIngredientError = {
  DIVIDE_BY_ZERO: "divide_by_zero",
  MALFORMED_QUANTITY: "malformed_quantity",

  UNRECOGNIZED_UNIT: "unrecognized_unit",
  MALFORMED_UNIT_DEFINITION: "malformed_unit_definition",

  UNRECOGNIZED_INGREDIENT: "unrecognized_ingredient",
  MALFORMED_INGREDIENT_DEFINITION: "malformed_unit_definition",
};

function success(quantity, name) {
  return {
    success: true,
    result: {
      quantity: quantity,
      unit: "g",
      name: name,
    }
  };
}

function failure(errors) {
  return {
    success: false,
    errors: errors,
  };
}

function convertIngredient(ingredient, unit_definitions, ingredient_definitions) {
  var resolvedUnit = unit_definitions.find((unit_defintion) => {
    return unit_defintion.unit === ingredient.unit;
  });

  var resolvedIngredient = ingredient_definitions.find((ingredient_definition) => {
    return ingredient_definition.name === ingredient.name;
  });

  if (resolvedUnit && resolvedIngredient) {
    var errors = [];
    if (typeof resolvedUnit.mL !== 'number') {
      errors.push(convertIngredientError.MALFORMED_UNIT_DEFINITION);
    }

    if (typeof resolvedIngredient.density !== 'number') {
      errors.push(convertIngredientError.MALFORMED_INGREDIENT_DEFINITION);
    }
    var quantityFraction;
    try {
      quantityFraction = Fraction(ingredient.quantity);
    } catch (e) {
      if (e instanceof Fraction.DivisionByZero) {
        errors.push(convertIngredientError.DIVIDE_BY_ZERO);
      } else if (e instanceof Fraction.InvalidParameter) {
        errors.push(convertIngredientError.MALFORMED_QUANTITY);
      } else {
        throw e;
      }
    }

    if (errors.length > 0) {
      return failure(errors);
    }

    var convertedQuantity = quantityFraction
      .mul(resolvedIngredient.density)
      .mul(resolvedUnit.mL)
      .round()
      .toString();

    return success(convertedQuantity, resolvedIngredient.name);
  } else {
    var errors = [];
    if (!resolvedUnit) {
      errors.push(convertIngredientError.UNRECOGNIZED_UNIT);
    }
    if (!resolvedIngredient) {
      errors.push(convertIngredientError.UNRECOGNIZED_INGREDIENT);
    }

    return failure(errors);
  }
}

module.exports = [
  convertIngredient,
  convertIngredientError
];