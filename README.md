# Reconv

a **re**ipe **conv**erter

## Requirements

- all client-side (no network requests should be required to do the conversion)
- 100% test coverage
- fast for bad connections: total download <500 kB

Nice to haves:

- two-way binding so changes to the output will be reflected in the input

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
