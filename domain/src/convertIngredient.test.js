const convertIngredient = require('./convertIngredient');

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
      error: {
        unitFound: false,
        ingredientFound: true,
      }
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
      error: {
        unitFound: true,
        ingredientFound: false,
      }
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
      error: {
        unitFound: false,
        ingredientFound: false,
      }
    }
  );
});