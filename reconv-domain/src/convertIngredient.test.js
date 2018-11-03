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

it('uses default unit and ingredient data if none specified', () => {
  var ingredient = {
    quantity: "1/2",
    unit: "c",
    name: "milk",
  };
  expect(convertIngredient(ingredient)).toEqual(
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
      errors: {
        unit: convertIngredientError.UNRECOGNIZED,
      }
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
      errors: {
        ingredient: convertIngredientError.UNRECOGNIZED,
      }
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
      errors: {
        unit: convertIngredientError.UNRECOGNIZED,
        ingredient: convertIngredientError.UNRECOGNIZED,
      }
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
      errors: {
        quantity: convertIngredientError.DIVIDE_BY_ZERO,
      }
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
      errors: {
        quantity: convertIngredientError.BAD_FORMAT
      }
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
      errors: {
        unit: convertIngredientError.BAD_DEFINITION,
      }
    }
  );

  var unit_defintions = [
    { "unit": "c", "mL": "1" } // mL not a number
  ];
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: {
        unit: convertIngredientError.BAD_DEFINITION
      }
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
      errors: {
        ingredient: convertIngredientError.BAD_DEFINITION
      }
    }
  );

  var ingredient_definitions = [
    { "name": "milk", "density": "1" } // density not a number
  ];
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: {
        ingredient: convertIngredientError.BAD_DEFINITION
      }
    }
  );
});

it('does not fail fast', () => {
  var ingredient = {
    quantity: "1/0",
    unit: "c",
    name: "milk",
  };
  var unit_defintions = [
    { "unit": "c" } // missing "mL"
  ];
  var ingredient_definitions = [
    { "name": "milk" } // missing "density"
  ];
  expect(convertIngredient(ingredient, unit_defintions, ingredient_definitions)).toEqual(
    {
      success: false,
      errors: {
        quantity: convertIngredientError.DIVIDE_BY_ZERO,
        unit: convertIngredientError.BAD_DEFINITION,
        ingredient: convertIngredientError.BAD_DEFINITION,
      }
    }
  );
});