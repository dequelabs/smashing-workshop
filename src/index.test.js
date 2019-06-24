// NOTE: to make testing easier, uncomment out this code which will
// set the document up with your demo app
// import snippet from './index.html';

// beforeEach(() => document.body.innerHTML = snippet);

test.todo('When a dialog opens, focus moves to an element inside the dialog');
test.todo('Tab: Moves focus to the next tabbable element inside the dialog.');
test.todo(
  'Tab: focus on last tabbable element, moves focus to the first tabbable element.'
);
test.todo(
  'Shift+Tab: Moves focus to the previous tabbable element inside the dialog.'
);
test.todo(
  'Shift+Tab: focus on the first tabbable element, moves focus to the last tabbable element.'
);
test.todo('Escape: Closes the dialog.');
test.todo(
  'The element that serves as the dialog container has a role of dialog.'
);

/**
 * This one is debatable because `aria-modal` isn't fully supported everywhere...
 * An alternative is to set `aria-hidden=true` on everything except for the modal
 * and direct ancestors of the modal (because children of aria-hidden elements are
 * also hidden!). Inversely, all of those element in which you added `aria-hidden=true`
 * should be set back to `false` when the modal closes.
 *
 * If you are up for the challenge take a stab at adding this functionality!
 */

test.todo('The dialog container element has aria-modal set to true.');
test.todo('Dialog has either aria-labelledby or aria-label');

/**
 * See if you can write test cases for the requirements aaron discussed earlier
 *
 * Example:
 * ```js
 * test.todo('focuses the heading when dialog is opened');
 * test('clicking the add ingredient button should add a new input and focus it', () => {
 *   const wrapper = document.getElementById('app')
 *   const addIngredient = wrapper.querySelector('.AddIngredient');
 *   const inputCount = wrapper.querySelectorAll('.ingredients input').length
 *   addIngredient.click();
 *   expect(wrapper.find('.ingredients input').length, inputCount + 1)
 *   expect(document.activeElement).toBe(wrapper.find('input').at(inputCount))
 * });
 * test.todo('clicking the delete button deletes the associated input and retains focus');
 * ```
 */
