var ingredients = require('../data/ingredients.json');
var units = require('../data/units.json');
var Fraction = require('fraction.js');

var convertIngredientError = {
  UNRECOGNIZED_UNIT: "unrecognized_unit",
  UNRECOGNIZED_INGREDIENT: "unrecognized_ingredient",
  DIVIDE_BY_ZERO: "divide_by_zero",
  MALFORMED_QUANTITY: "malformed_quantity",
};

function failure(errors) {
  return ({
    success: false,
    errors: errors,
  });
}

function convertIngredient(ingredient) {
  var resolvedUnit = units.find((e) => {
    return e.unit === ingredient.unit;
  });

  var resolvedIngredient = ingredients.find((e) => {
    return e.name === ingredient.name;
  });

  if (resolvedUnit && resolvedIngredient) {
    // TODO: check for resolvedIngredient.density and resolvedUnit.mL
    var quantityFraction;
    try {
      quantityFraction = Fraction(ingredient.quantity);
    } catch (e) {
      if (e instanceof Fraction.DivisionByZero) {
        return failure([convertIngredientError.DIVIDE_BY_ZERO]);
      } else if (e instanceof Fraction.InvalidParameter) {
        return failure([convertIngredientError.MALFORMED_QUANTITY]);
      } else {
        throw e;
      }
    }

    return ({
      success: true,
      result: {
        quantity: quantityFraction.mul(resolvedIngredient.density).mul(resolvedUnit.mL).round().toString(),
        unit: "g",
        name: resolvedIngredient.name,
      }
    });
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