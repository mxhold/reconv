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
  const water_converted = convertIngredient(water);
  expect(water_converted.quantity).toEqual("119");
  expect(water_converted.unit).toEqual("g");

  const butter = { quantity: "1/2", unit: "c", name: "butter" };
  const butter_converted = convertIngredient(butter);
  expect(butter_converted.quantity).toEqual("114");
  expect(butter_converted.unit).toEqual("g");
});

it('sets metadata depending on if conversion was possible', () => {
  const water = { quantity: "1/2", unit: "c", name: "water" };
  const water_converted = convertIngredient(water);
  expect(water_converted.metadata).toEqual({ ingredientFound: true, unitFound: true });

  const notfood = { quantity: "1/2", unit: "c", name: "notfood" };
  const notfood_converted = convertIngredient(notfood);
  expect(notfood_converted.metadata).toEqual({ ingredientFound: false, unitFound: true });

  const water_badunit = { quantity: "1/2", unit: "nounit", name: "water" };
  const water_badunit_converted = convertIngredient(water_badunit);
  expect(water_badunit_converted.metadata).toEqual({ ingredientFound: true, unitFound: false });
});

it('sets metadata even with NaN quantity', () => {
  const water = { quantity: "1/0", unit: "c", name: "water" };
  const water_converted = convertIngredient(water);
  expect(water_converted.metadata).toEqual({ ingredientFound: true, unitFound: true });
});
