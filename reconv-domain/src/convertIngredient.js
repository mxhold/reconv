var Fraction = require('fraction.js');
var default_unit_definitions = require('../data/units');
var default_ingredient_definitions = require('../data/ingredients');

var convertIngredientError = {
  DIVIDE_BY_ZERO: "divide_by_zero",
  BAD_FORMAT: "bad_format",
  BAD_DEFINITION: "bad_definition",
  UNRECOGNIZED: "unrecognized",
};

function convertIngredient(ingredient, ingredient_definitions, unit_definitions) {
  if (arguments.length === 1) {
    ingredient_definitions = default_ingredient_definitions;
    unit_definitions = default_unit_definitions;
  }

  if (arguments.length === 2) {
    unit_definitions = default_unit_definitions;
  }
  
  var resolvedUnit = unit_definitions.find((unit_defintion) => {
    return unit_defintion.unit === ingredient.unit;
  });

  var resolvedIngredient = ingredient_definitions.find((ingredient_definition) => {
    return ingredient_definition.name === ingredient.name;
  });

  var errors = {};

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
  } else if (typeof resolvedUnit.mL !== 'number' || isNaN(resolvedUnit.mL)) {
    errors.unit = convertIngredientError.BAD_DEFINITION;
  }

  if (!resolvedIngredient) {
    errors.ingredient = convertIngredientError.UNRECOGNIZED;
  } else if (typeof resolvedIngredient.density !== 'number' || isNaN(resolvedIngredient.density)) {
    errors.ingredient = convertIngredientError.BAD_DEFINITION;
  }

  for(var attribute in errors) {
    if(errors[attribute]) {
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