import convertIngredient from './convertIngredient.js';

it('does not mutate the provided object', () => {
  const object = { quantity: "1" };
  const result = convertIngredient(object);
  expect(result == object).toEqual(false);
});

it('sets quantity to NaN on division by zero', () => {
  expect(convertIngredient({ quantity: "1/0" }).quantity).toEqual("NaN");
});

it('converts from american volume units to metric weights', () => {
  const water = { quantity: "1/2", unit: "c", name: "water" };
  const water_converted = { quantity: "119", unit: "g", name: "water" };
  expect(convertIngredient(water)).toEqual(water_converted);

  const butter = { quantity: "1/2", unit: "c", name: "butter" };
  const butter_converted = { quantity: "114", unit: "g", name: "butter" };
  expect(convertIngredient(butter)).toEqual(butter_converted);
});
