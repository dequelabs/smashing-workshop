import React from 'react';
import { mount } from 'enzyme';
import Recipes from './';
import data from '../../data';
import { axe } from 'jest-axe';

const defaultProps = {
  recipes: data,
  updateRecipe: () => {},
  updateModalState: () => {},
  modalState: {
    edit: false,
    view: false
  }
};
const recipes = mount(<Recipes {...defaultProps} />);

afterEach(async () => {
  expect(await axe(recipes.html())).toHaveNoViolations();
});

test('recipe image is marked as decorative', () => {
  recipes.find('img').forEach(img => {
    expect(img.getDOMNode().getAttribute('alt')).toBe('');
    expect(img.getDOMNode().getAttribute('role')).toBe('presentation');
  });
});

test('edit (pencil icon) is a button', () => {
  const pencil = recipes.find('.Recipes__card-head button');
  // NOTE: the selector above verifies that it is a "button"
  expect(pencil.exists()).toBe(true);
});

test('edit (pencil icon) has accessible text "Edit {recipe name}"', () => {
  const pencil = recipes.find('.Recipes__card-head button');
  expect(
    pencil
      .at(0)
      .getDOMNode()
      .getAttribute('aria-label')
  ).toBe(`Edit ${data[0].name}`);
});

test('recipe info is marked up as a description list', () => {
  const recipeInfo = recipes.find('.Recipes__card-content dl');
  // NOTE: the selector above verifies that it is a "dl"
  expect(recipeInfo.exists()).toBe(true);
});
