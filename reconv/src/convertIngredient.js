import Fraction from 'fraction.js';
import conversionData from './ingredients.json';
import unitData from './units.json';

export default function convertIngredient(ingredient) {
  let ingredientData = Object.assign({}, ingredient);

  ingredientData.quantity = toFraction(ingredientData.quantity);

  const conversionDatum = conversionData.find((e) => {
    return e.name === ingredientData.name;
  });
  const unitDatum = unitData.find((e) => {
    return e.unit === ingredientData.unit;
  });

  ingredientData.metadata = {
    ingredientFound: !!conversionDatum,
    unitFound: !!unitDatum,
  };

  if (Number.isNaN(ingredientData.quantity)) {
    ingredientData.quantity = "NaN";
  } else {
    if (conversionDatum && unitDatum) {
      ingredientData.quantity = ingredientData.quantity.mul(conversionDatum.gramsPerML).mul(unitDatum.mL);
      ingredientData.unit = "g";
    }
    ingredientData.quantity = ingredientData.quantity.round().toString();
  }

  return ingredientData;
}

function toFraction(quantity) {
  try {
    quantity = Fraction(quantity);
  } catch (e) {
    if (e instanceof Fraction.DivisionByZero) {
      quantity = NaN;
    } else {
      throw e;
    }
  }

  return quantity;
}
