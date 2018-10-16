import Fraction from 'fraction.js';

export default function convertIngredient(ingredient) {
  const conversionData = [
    { name: "water", gramsPerML: 1 },
    { name: "butter", gramsPerML: 0.96 },
  ];
  const unitData = [
    { unit: "c", mL: 237 },
  ];

  let ingredientData = Object.assign({}, ingredient);

  ingredientData.quantity = toFraction(ingredientData.quantity);

  if (Number.isNaN(ingredientData.quantity)) {
    ingredientData.quantity = "NaN";
  } else {
    const conversionDatum = conversionData.find((e) => {
      return e.name === ingredientData.name;
    });
    const unitDatum = unitData.find((e) => {
      return e.unit === ingredientData.unit;
    });

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
