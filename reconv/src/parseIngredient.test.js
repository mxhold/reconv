import parseIngredient from './parseIngredient.js';

it('parses a simple ingredient', () => {
  const text = "1c butter";
  const ingredient = { quantity: "1", unit: "c", name: "butter" };
  expect(parseIngredient(text)).toEqual(ingredient);
});

it('parses a fraction ingredient', () => {
  const text = "1/2c butter";
  const ingredient = { quantity: "1/2", unit: "c", name: "butter" };
  expect(parseIngredient(text)).toEqual(ingredient);
});

it('returns null on an unparsable string', () => {
  const text = "1/2 butter";
  expect(parseIngredient(text)).toEqual(null);
});
