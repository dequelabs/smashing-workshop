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

test('mounts', () => {
  mount(<App />);
});
