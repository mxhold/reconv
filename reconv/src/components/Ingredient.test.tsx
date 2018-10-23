import * as React from 'react';
import * as enzyme from 'enzyme';
import { Ingredient, MalformedIngredient } from './Ingredient';

it('renders an ingredient', () => {
  const wrapper = enzyme.shallow(<Ingredient quantity="1/2" unit="c" name="butter" />);
  const divs = wrapper.find(".ingredient");
  const butter = divs.first();
  expect(butter.find(".ingredient-quantity").text()).toEqual("1/2");
  expect(butter.find(".ingredient-unit").text()).toEqual("c");
  expect(butter.find(".ingredient-name").text()).toEqual("butter");
});

it('renders a malformed ingredient', () => {
  const wrapper = enzyme.shallow(<MalformedIngredient input="1 butter" />);
  const divs = wrapper.find(".ingredient");
  const butter = divs.first();
  expect(butter.find(".ingredient--malformed").text()).toEqual("1 butter");
});

it('adds class if unit not found', () => {
  const wrapper = enzyme.shallow(<Ingredient quantity="1/2" unit="c" name="butter" unitFound={false} />);
  const divs = wrapper.find(".ingredient.ingredient--unit-not-found");
  const butter = divs.first();
  expect(butter.find(".ingredient-quantity").text()).toEqual("1/2");
  expect(butter.find(".ingredient-unit").text()).toEqual("c");
  expect(butter.find(".ingredient-name").text()).toEqual("butter");
});

it('adds class if ingredient not found', () => {
  const wrapper = enzyme.shallow(<Ingredient quantity="1/2" unit="c" name="butter" ingredientFound={false} />);
  const divs = wrapper.find(".ingredient.ingredient--ingredient-not-found");
  const butter = divs.first();
  expect(butter.find(".ingredient-quantity").text()).toEqual("1/2");
  expect(butter.find(".ingredient-unit").text()).toEqual("c");
  expect(butter.find(".ingredient-name").text()).toEqual("butter");
});