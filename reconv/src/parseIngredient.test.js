import parseIngredient from './parseIngredient.js';

it('parses an ingredient with an integer quantity', () => {
  const text = "1c butter";
  const ingredient = { quantity: "1", unit: "c", name: "butter" };
  expect(parseIngredient(text)).toEqual(ingredient);
});

it('parses with a fraction ingredient', () => {
  const text = "1/2c butter";
  const ingredient = { quantity: "1/2", unit: "c", name: "butter" };
  expect(parseIngredient(text)).toEqual(ingredient);
});

it('returns null on an unparsable string', () => {
  const text = "1/2 butter";
  expect(parseIngredient(text)).toEqual(null);
});

it('parses with a decimal quantity', () => {
  const text = "1.2c butter";
  const ingredient = { quantity: "1.2", unit: "c", name: "butter" };
  expect(parseIngredient(text)).toEqual(ingredient);
});
