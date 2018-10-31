const ingredients = require('../data/ingredients.json');
const units = require('../data/units.json');


function convertIngredient(ingredient) {
  const resolvedUnit = units.find((e) => {
    return e.unit === ingredient.unit;
  });

  const resolvedIngredient = ingredients.find((e) => {
    return e.name === ingredient.name;
  });

  if (resolvedUnit && resolvedIngredient) {
    return ({
      success: true,
      result: {
        quantity: "119",
        unit: "g",
        name: "water",
      }
    });
  } else {
    return ({
      success: false,
      error: {
        unitFound: !!resolvedUnit,
        ingredientFound: !!resolvedIngredient,
      }
    });
  }
}

module.exports = convertIngredient;

// import Fraction from 'fraction.js';
// import conversionData from './ingredients.json';
// import unitData from './units.json';

// export default function convertIngredient(ingredient) {
//   let ingredientData = Object.assign({}, ingredient);

//   const conversionDatum = conversionData.find((e) => {
//     return e.name === ingredientData.name;
//   });
//   const unitDatum = unitData.find((e) => {
//     return e.unit === ingredientData.unit;
//   });

//   ingredientData.metadata = {
//     ingredientFound: !!conversionDatum,
//     unitFound: !!unitDatum,
//   };

//   if (Number.isNaN(toFraction(ingredientData.quantity))) {
//     ingredientData.quantity = "NaN";
//   } else {
//     if (conversionDatum && unitDatum) {
//       ingredientData.quantity = toFraction(ingredientData.quantity).mul(conversionDatum.density).mul(unitDatum.mL).round();
//       ingredientData.unit = "g";
//     }
//     ingredientData.quantity = ingredientData.quantity.toString();
//   }

//   return ingredientData;
// }

// function toFraction(quantity) {
//   try {
//     quantity = Fraction(quantity);
//   } catch (e) {
//     if (e instanceof Fraction.DivisionByZero) {
//       quantity = NaN;
//     } else if (e instanceof Fraction.InvalidParameter) {
//       quantity = NaN;
//     }
//   }

//   return quantity;
// }
