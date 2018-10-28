const parseIngredient = require('./parseIngredient');

it('parses an ingredient with an integer quantity', () => {
  const string = "1c butter";
  const ingredient = { quantity: "1", unit: "c", name: "butter" };
  expect(parseIngredient(string)).toEqual(ingredient);
});
