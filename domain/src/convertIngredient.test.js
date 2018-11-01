var [convertIngredient, convertIngredientError] = require('./convertIngredient');

it('converts from american volume units to metric weights', () => {
  expect(convertIngredient(
    {
      quantity: "1/2",
      unit: "c",
      name: "water",
    }
  )).toEqual(
    {
      success: true,
      result: {
        quantity: "119",
        unit: "g",
        name: "water",
      }
    }
  );
});

it('fails on unrecognized unit', () => {
  expect(convertIngredient(
    {
      quantity: "1/2",
      unit: "plorp",
      name: "water",
    }
  )).toEqual(
    {
      success: false,
      errors: [convertIngredientError.UNRECOGNIZED_UNIT]
    }
  );
});

it('fails on unrecognized ingredient', () => {
  expect(convertIngredient(
    {
      quantity: "1/2",
      unit: "c",
      name: "floop",
    }
  )).toEqual(
    {
      success: false,
      errors: [convertIngredientError.UNRECOGNIZED_INGREDIENT]
    }
  );
});

it('fails on both unrecognized unit and unrecognized ingredient', () => {
  expect(convertIngredient(
    {
      quantity: "1/2",
      unit: "plorp",
      name: "floop",
    }
  )).toEqual(
    {
      success: false,
      errors: [
        convertIngredientError.UNRECOGNIZED_UNIT,
        convertIngredientError.UNRECOGNIZED_INGREDIENT
      ]
    }
  );
});

it('fails on divide by zero', () => {
  expect(convertIngredient(
    {
      quantity: "1/0",
      unit: "c",
      name: "water",
    }
  )).toEqual(
    {
      success: false,
      errors: [convertIngredientError.DIVIDE_BY_ZERO]
    }
  );
});

it('fails on malformed quantity', () => {
  expect(convertIngredient(
    {
      quantity: "1 1",
      unit: "c",
      name: "water",
    }
  )).toEqual(
    {
      success: false,
      errors: [convertIngredientError.MALFORMED_QUANTITY]
    }
  );
});