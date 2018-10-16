import React from 'react';
import { mount } from 'enzyme';
import IngredientListInput from './IngredientListInput.js';

it('renders an Ingredient for each line in the textarea', () => {
  const wrapper = mount(<IngredientListInput value={"1/2c butter\n1c milk"} />);
  const divs = wrapper.find(".ingredient");
  const butter = divs.first();
  expect(butter.find(".ingredient-quantity").text()).toEqual("1/2");
  expect(butter.find(".ingredient-unit").text()).toEqual("c");
  expect(butter.find(".ingredient-name").text()).toEqual("butter");
});

it('renders malformed ingredients', () => {
  const wrapper = mount(<IngredientListInput value="1 thing" />);
  const divs = wrapper.find(".ingredient");
  const butter = divs.first();
  expect(butter.find(".ingredient--malformed").text()).toEqual("1 thing");
});
