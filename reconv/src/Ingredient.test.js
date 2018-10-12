import React from 'react';
import { shallow } from 'enzyme';
import Ingredient from './Ingredient';

it('renders an ingredient', () => {
  const wrapper = shallow(<Ingredient quantity="1/2" unit="c" name="butter" />);
  const divs = wrapper.find(".ingredient");
  const butter = divs.first();
  expect(butter.find(".ingredient-quantity").text()).toEqual("1/2");
  expect(butter.find(".ingredient-unit").text()).toEqual("c");
  expect(butter.find(".ingredient-name").text()).toEqual("butter");
});
