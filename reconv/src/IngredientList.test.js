import React from 'react';
import { shallow } from 'enzyme';
import IngredientList from './IngredientList.js';

it('renders an ingredient list with the appropriate tags', () => {
  const ingredientData = [
    { quantity: "1/2", unit: "c", name: "butter" },
    { quantity: "1", unit: "c", name: "sugar" },
  ];
  const wrapper = shallow(<IngredientList ingredients={ingredientData} />);
  expect(wrapper.first().props()).toEqual(ingredientData[0]);
  expect(wrapper.first().key()).toEqual("0");
});
