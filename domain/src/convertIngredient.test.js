var [convertIngredient, convertIngredientError] = require('./convertIngredient');

var unit_defintions = [{ "unit": "c", "mL": 237 }];
var ingredient_definitions = [{ "name": "milk", "density": 1.032903803 }];

it('converts from american volume units to metric weights', () => {
  var ingredient = {
    quantity: "1/2",
    unit: "c",
    name: "milk",
  };
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: true,
      result: {
        quantity: "122",
        unit: "g",
        name: "milk",
      }
    }
  );
});

it('fails on unrecognized unit', () => {
  var ingredient = {
    quantity: "1/2",
    unit: "plorp",
    name: "milk",
  };
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: [convertIngredientError.UNRECOGNIZED_UNIT]
    }
  );
});

it('fails on unrecognized ingredient', () => {
  var ingredient = {
    quantity: "1/2",
    unit: "c",
    name: "floop",
  }
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: [convertIngredientError.UNRECOGNIZED_INGREDIENT]
    }
  );
});

it('fails on both unrecognized unit and unrecognized ingredient', () => {
  var ingredient =     {
    quantity: "1/2",
    unit: "plorp",
    name: "floop",
  };
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
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
  var ingredient = {
    quantity: "1/0",
    unit: "c",
    name: "milk",
  };
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: [convertIngredientError.DIVIDE_BY_ZERO]
    }
  );
});

it('fails on malformed quantity', () => {
  var ingredient = {
    quantity: "1 1",
    unit: "c",
    name: "milk",
  };
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: [convertIngredientError.MALFORMED_QUANTITY]
    }
  );
});

it('fails on malformed unit definition', () => {
  var ingredient = {
    quantity: "1",
    unit: "c",
    name: "milk",
  };
  var unit_defintions = [
    { "unit": "c" } // missing "mL"
  ];
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: [convertIngredientError.MALFORMED_UNIT_DEFINITION]
    }
  );

  var unit_defintions = [
    { "unit": "c", "mL": "1" } // mL not a number
  ];
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: [convertIngredientError.MALFORMED_UNIT_DEFINITION]
    }
  );
});

it('fails on malformed ingredient definition', () => {
  var ingredient = {
    quantity: "1",
    unit: "c",
    name: "milk",
  };
  var ingredient_definitions = [
    { "name": "milk" } // missing "density"
  ];
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: [convertIngredientError.MALFORMED_INGREDIENT_DEFINITION]
    }
  );

  var ingredient_definitions = [
    { "name": "milk", "density": "1" } // density not a number
  ];
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: [convertIngredientError.MALFORMED_INGREDIENT_DEFINITION]
    }
  );
});
