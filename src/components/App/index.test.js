import React from 'react';
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
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

let wrapper;
afterEach(async () => {
  expect(await axe(wrapper.html())).toHaveNoViolations();
});

test('mounts', () => {
  wrapper = mount(<App />);
});
