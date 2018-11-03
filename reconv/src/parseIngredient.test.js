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

it('allows anything in ingredient name', () => {
  const text = "1.2c pork-pie & #5 ham* (important/note: 2% or nonfat?!)";
  const ingredient = { quantity: "1.2", unit: "c", name: "pork-pie & #5 ham* (important/note: 2% or nonfat?!)" };
  expect(parseIngredient(text)).toEqual(ingredient);
});

it('allows whole numbers with fractions', () => {
  const text = "1 1/2c butter";
  const ingredient = { quantity: "1 1/2", unit: "c", name: "butter" };
  expect(parseIngredient(text)).toEqual(ingredient);
});

it('parses with multiple digit quantity', () => {
  const text = "11c butter";
  const ingredient = { quantity: "11", unit: "c", name: "butter" };
  expect(parseIngredient(text)).toEqual(ingredient);
});
