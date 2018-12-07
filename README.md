# Reconv

a **re**cipe **conv**erter

## Requirements

### Inputs
#### Recipe with American/volumetric units

```
1/2c butter
1c sugar
2 eggs, beaten
3 bananas, crushed
1 1/2c flour
1t baking soda
1/2t salt
1/2t vanilla
```

#### Unit definitions

(unit name, equivalence in mL)
```
t,4.92892
c,237
```

#### Ingredient definitions

(ingredient name, density)
```
butter,0.9586114185
flour,0.5112594232
sugar,0.811522894
salt,1.215799848
baking soda,0.9134163392
```

### Outputs

the same recipe ingredient list with metric/weight units (with undefined ingredients ignored):
```
114g butter
192g sugar
2 eggs, beaten
3 bananas, crushed
182g flour
5g baking soda
3g salt
1/2t vanilla
```

## Limitations

To make the solution simpler to implement, the problem has been restricted in a few ways:

- input recipe lines have to be in a very restricted syntax:
  - a quantity like "1", "1.5", "1/2", or "1 1/2"
  - followed by a unit with no spaces in it
  - followed by any number of spaces
  - followed by an ingredient (can have spaces)

- the ingredient must match the defined ingredient *exactly* ("unsalted butter" would not match "butter")
  - this helps because if we allow partial matches, the ingredient list would then need to be ordered by specificity

This means you can't really paste any recipe and expect it to Just Work™; you have to do a bit of massaging.

## Structure

- `reconv-domain/`: a Javascript (ES2015) library that implements the domain logic for the problem:
  - `parseIngredient` which takes a string and returns an ingredient object:
    - ```js
      parseIngredient("1 1/2c butter")
      {
        success: true,
        result: {
          quantity: "1 1/2",
          unit: "c",
          name: "butter",
        },
      }
      ```
  - `convertIngredient` which takes an ingredient object and converts it to grams (using the provided ingredient and unit definitions):
    - ```js
      convertIngredient({quantity: "1/2", unit: "c", name: "milk"}, [{ "name": "milk", "density": 1.032903803 }], [{ "unit": "c", "mL": 237 }])
      {
        success: true,
        result: {
          quantity: "122",
          unit: "g",
          name: "milk",
        }
      }
      ```
  - it also includes `ingredients.json` and `units.jsons` files that define a base set of definitions
- `reconv/`: a React app that provides a UI wrapping the recipe conversion logic from the domain library
  - See it live at <https://maxwellholder.com/reconv/>