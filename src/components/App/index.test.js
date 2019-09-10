import React from 'react';
import { mount } from 'enzyme';
import App from './';

const preventDefault = () => {};
const tab = {
  preventDefault,
  key: 'Tab',
  shiftKey: false
};

const shiftTab = {
  preventDefault,
  key: 'Tab',
  shiftKey: true
};

const openModal = wrapper => wrapper.setState({ open: true });
const fireKeydown = (wrapper, target, e) => {
  wrapper.instance().onKeyDown({
    ...e,
    target
  });
};

describe('focus trap', () => {
  test('tab on OK button focuses close button', () => {
    const wrapper = mount(<App />);
    openModal(wrapper);
    fireKeydown(wrapper, wrapper.instance().okButton, tab);
    expect(document.activeElement).toBe(wrapper.instance().closeButton);
  });

  test('shift+tab on close button focuses OK button', () => {
    const wrapper = mount(<App />);
    openModal(wrapper);
    fireKeydown(wrapper, wrapper.instance().closeButton, shiftTab);
    expect(document.activeElement).toBe(wrapper.instance().okButton);
  });

  test('shift+tab on heading focuses OK button', () => {
    const wrapper = mount(<App />);
    openModal(wrapper);
    fireKeydown(wrapper, wrapper.instance().modalHeading, shiftTab);
    expect(document.activeElement).toBe(wrapper.instance().okButton);
  });
});

test('escape key closes modal and returns focus to trigger', done => {
  const wrapper = mount(<App />);
  openModal(wrapper);
  fireKeydown(wrapper, wrapper.instance().modalHeading, {
    key: 'Escape'
  });
  setTimeout(() => {
    // wait a tic for setState to finish
    expect(wrapper.state('open')).toBe(false);
    expect(document.activeElement).toBe(wrapper.instance().trigger);
    done();
  });
});
