import React from 'react';
import { mount } from 'enzyme';
import RecipeModal from './RecipeModal';
import data from '../data';

const noop = () => {};
const defaultProps = {
  edit: true,
  show: true,
  recipe: data[0],
  updateRecipe: noop,
  onClose: noop
};

describe('Edit recipe', () => {
  test('each text field has a unique accessible label', () => {
    const modal = mount(<RecipeModal {...defaultProps} />);
    const labels = [];
    modal.find('.dqpl-label').forEach(label => {
      const text = label.text();
      expect(labels.includes(text)).toBeFalsy();
      labels.push(text);
    });
  });

  test('each delete button has a unique accessible name', () => {
    const modal = mount(<RecipeModal {...defaultProps} />);
    const names = [];
    modal.find('.RecipeModal__ingredient-delete').forEach(button => {
      const name = button.getDOMNode().getAttribute('aria-label');
      expect(names.includes(name)).toBeFalsy();
      names.push(name);
    });
  });

  test('clicking delete button shifts focus to section wrapper', () => {
    const modal = mount(<RecipeModal {...defaultProps} />);
    const deleteButton = modal.find('.RecipeModal__ingredient-delete').at(0);
    deleteButton.simulate('click');
    expect(document.activeElement).toBe(modal.instance().ingredientsWrapper);
  });

  test('clicking "Add another ingredient" adds new ingredient input/focuses it', () => {
    const modal = mount(<RecipeModal {...defaultProps} />);
    const initialInputCount = modal.find('.Ingredients .dqpl-text-input')
      .length;
    const addButton = modal.find('.RecipeModal__add-another button').at(0);
    addButton.simulate('click');
    // grab an updated list of inputs
    const inputs = modal.find('.Ingredients .dqpl-text-input');
    expect(inputs.length).toBe(initialInputCount + 1);
    expect(document.activeElement).toBe(
      inputs.at(inputs.length - 1).getDOMNode()
    );
  });

  test('clicking "Add another instruction" adds new instruction input/focuses it', () => {
    // RecipeModal__add-instruction
    const modal = mount(<RecipeModal {...defaultProps} />);
    const initialInputCount = modal.find('.Instructions .dqpl-textarea').length;
    const addButton = modal.find('.RecipeModal__add-instruction').at(0);
    addButton.simulate('click');
    // grab an updated list of inputs
    const inputs = modal.find('.Instructions .dqpl-textarea');
    expect(inputs.length).toBe(initialInputCount + 1);
    expect(document.activeElement).toBe(
      inputs.at(inputs.length - 1).getDOMNode()
    );
  });

  describe('validation', () => {
    let modal, inputs, firstInput;
    beforeAll(() => {
      modal = mount(<RecipeModal {...defaultProps} />);
      inputs = modal.find('.dqpl-text-input');
      firstInput = inputs.at(0).getDOMNode();
      // clear out first ingredient text input
      firstInput.value = '';
      modal.find('button[type="submit"]').simulate('click');
    });

    test('focuses first erroneous input', () => {
      expect(document.activeElement).toBe(inputs.at(0).getDOMNode());
    });

    test('associates erroneous field with its error message', () => {
      const firstErrorMessage = modal
        .find('.dqpl-error-wrap')
        .at(0)
        .getDOMNode();
      expect(
        firstInput
          .getAttribute('aria-describedby')
          .includes(firstErrorMessage.id)
      ).toBe(true);
    });

    test('sets aria-invalid=true on each erroneous field', () => {
      expect(firstInput.getAttribute('aria-invalid')).toBe('true');
    });
  });
});

describe('Cook recipe', () => {
  let modal;
  beforeAll(() => {
    modal = mount(<RecipeModal {...defaultProps} edit={false} />);
  });

  test('"I cooked it" is a button', () => {
    const submit = modal.find('.dqpl-button-primary');
    expect(submit.text()).toBe('I cooked it');
    expect(submit.getDOMNode().tagName).toBe('BUTTON');
  });

  test('"Close" is a button', () => {
    const close = modal.find('.dqpl-button-secondary');
    expect(close.text()).toBe('Close');
    expect(close.getDOMNode().tagName).toBe('BUTTON');
  });

  test('"X" (close) is a button', () => {
    const x = modal.find('.dqpl-close');
    expect(x.text()).toBe('Close');
    expect(x.getDOMNode().tagName).toBe('BUTTON');
  });
});
