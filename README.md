# Reconv

a **re**cipe **conv**erter

## Requirements

- all client-side (no network requests should be required to do the conversion)
- 100% test coverage
- fast for bad connections: total download <500 kB
- no perceptible delay

Nice to haves:

- Baker's percentage
- Levenshtein distance spelling correct
- Import/export definitions via file

### Inputs
a recipe ingredient list with American/volumetric units

for example:

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

### Outputs

the same recipe ingredient list with metric/weight units

for example:

```
113g butter
225g sugar
2 eggs, beaten
3 bananas, crushed
180g flour
1t baking soda
1/2t salt
1/2t vanilla
```

## Setup

1. Install [nvm](https://github.com/creationix/nvm#installation)
2. `nvm install 10.11.0`
3. `nvm use`
