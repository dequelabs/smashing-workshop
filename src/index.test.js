// NOTE: to make testing easier, uncomment out this code which will
// set the document up with your demo app
import simulant from 'simulant'; // util for firing events
import snippet from './index.html';
import a11yModal from './app';

beforeEach(() => {
  document.body.innerHTML = snippet;
  a11yModal();
});

test('When a dialog opens, focus moves to an element inside the dialog', () => {
  const trigger = document.querySelector('.Edit');
  trigger.click();
  expect(document.activeElement).toBe(document.querySelector('.modal h2'));
});
test('Tab: focus on last tabbable element, moves focus to the first tabbable element.', () => {
  const modal = document.querySelector('.modal');
  const trigger = document.querySelector('.Edit');
  const cancel = modal.querySelector('.cancel');
  trigger.click();
  cancel.focus();
  const event = simulant('keydown', {
    which: 9
  });
  simulant.fire(cancel, event);
  expect(document.activeElement).toBe(document.querySelector('.modal-close'));
});
test('Shift+Tab: focus on the first tabbable element, moves focus to the last tabbable element.', () => {
  const modal = document.querySelector('.modal');
  const trigger = document.querySelector('.Edit');
  const close = document.querySelector('.modal-close');
  const cancel = modal.querySelector('.cancel');
  trigger.click();
  close.focus();
  const event = simulant('keydown', {
    which: 9,
    shiftKey: true
  });
  simulant.fire(close, event);
  expect(document.activeElement).toBe(cancel);
});
test('shift tab on the heading focuses the cancel button', () => {
  const modal = document.querySelector('.modal');
  const trigger = document.querySelector('.Edit');
  const heading = modal.querySelector('h2');
  const cancel = modal.querySelector('.cancel');
  trigger.click();
  heading.focus();
  const event = simulant('keydown', {
    which: 9,
    shiftKey: true
  });
  simulant.fire(heading, event);
  expect(document.activeElement).toBe(cancel);
});

test('Escape: Closes the dialog.', () => {
  const modal = document.querySelector('.modal');
  const trigger = document.querySelector('.Edit');

  // open the modal
  trigger.click();
  const event = simulant('keydown', {
    which: 27
  });
  simulant.fire(modal, event);
  expect(document.activeElement).toBe(trigger);
});
test('clicking cancel closes the modal and returns focus to the trigger', () => {
  const modal = document.querySelector('.modal');
  const trigger = document.querySelector('.Edit');
  const cancel = document.querySelector('.cancel');

  // open the modal
  trigger.click();
  cancel.click();
  expect(document.activeElement).toBe(trigger);
  expect(modal.classList.contains('open')).toBe(false);
});
test('The element that serves as the dialog container has a role of dialog.', () => {
  const modal = document.querySelector('.modal');
  expect(modal.getAttribute('role')).toBe('dialog');
});

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
