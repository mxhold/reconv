var Fraction = require('fraction.js');

var convertIngredientError = {
  DIVIDE_BY_ZERO: "divide_by_zero",
  BAD_FORMAT: "bad_format",
  BAD_DEFINITION: "bad_definition",
  UNRECOGNIZED: "unrecognized",
};

function convertIngredient(ingredient, unit_definitions, ingredient_definitions) {
  var resolvedUnit = unit_definitions.find((unit_defintion) => {
    return unit_defintion.unit === ingredient.unit;
  });

  var resolvedIngredient = ingredient_definitions.find((ingredient_definition) => {
    return ingredient_definition.name === ingredient.name;
  });

  var errors = {
    quantity: undefined,
    unit: undefined,
    ingredient: undefined,
  };

  var quantityFraction;
  try {
    quantityFraction = Fraction(ingredient.quantity);
  } catch (e) {
    if (e instanceof Fraction.DivisionByZero) {
      errors.quantity = convertIngredientError.DIVIDE_BY_ZERO;
    } else if (e instanceof Fraction.InvalidParameter) {
      errors.quantity = convertIngredientError.BAD_FORMAT;
    } else {
      throw e;
    }
  }

  if (!resolvedUnit) {
    errors.unit = convertIngredientError.UNRECOGNIZED;
  } else if (typeof resolvedUnit.mL !== 'number') {
    errors.unit = convertIngredientError.BAD_DEFINITION;
  }

  if (!resolvedIngredient) {
    errors.ingredient = convertIngredientError.UNRECOGNIZED;
  } else if (typeof resolvedIngredient.density !== 'number') {
    errors.ingredient = convertIngredientError.BAD_DEFINITION;
  }

  for(var attribute in errors) {
    if(errors[attribute] !== undefined) {
      return {
        success: false,
        errors: errors,
      };
    }
  }

  var convertedQuantity = quantityFraction
    .mul(resolvedIngredient.density)
    .mul(resolvedUnit.mL)
    .round()
    .toString();

  return {
    success: true,
    result: {
      quantity: convertedQuantity,
      unit: "g",
      name: resolvedIngredient.name,
    }
  };
}

module.exports = [
  convertIngredient,
  convertIngredientError
];