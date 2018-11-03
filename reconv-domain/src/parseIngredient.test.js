const parseIngredient = require('./parseIngredient');

it('parses a simple integer quantity', () => {
  expect(parseIngredient("12c butter")).toEqual(
    {
      success: true,
      result: {
        quantity: "12",
        unit: "c",
        name: "butter",
      },
    }
  );
});

it('parses a fraction quantity', () => {
  expect(parseIngredient("1/2c butter")).toEqual(
    {
      success: true,
      result: {
        quantity: "1/2",
        unit: "c",
        name: "butter",
      },
    }
  );
});

it('parses a decimal quantity', () => {
  expect(parseIngredient("1.5c butter")).toEqual(
    {
      success: true,
      result: {
        quantity: "1.5",
        unit: "c",
        name: "butter",
      },
    }
  );
});

it('parses a whole number quantity with fraction', () => {
  expect(parseIngredient("1 1/2c butter")).toEqual(
    {
      success: true,
      result: {
        quantity: "1 1/2",
        unit: "c",
        name: "butter",
      },
    }
  );
});

it('errors on string without unit', () => {
  expect(parseIngredient("1/2 butter")).toEqual(
    {
      success: false,
      errorMessage: 'provided string "1/2 butter" cannot be parsed with regex /^((?:\\d+ )?\\d+[\\/.]?\\d*)([A-z]+) +(.+)$/',
    }
  );
});