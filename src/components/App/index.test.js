import React from 'react'
import { mount } from 'enzyme'
import App from './'

const preventDefault = () => {}
const tab = {
  preventDefault,
  key: 'Tab',
  shiftKey: false
}

const shiftTab = {
  preventDefault,
  key: 'Tab',
  shiftKey: true
}

const openModal = wrapper => wrapper.setState({ open: true })
const fireKeydown = (wrapper, target, e) => {
  wrapper.instance().onKeyDown({
    ...e, target
  })
}

describe('focus trap', () => {
  test('tab on OK button focuses close button', () => {
    const wrapper = mount(<App />)
    openModal(wrapper)
    fireKeydown(wrapper, wrapper.instance().okButton, tab)
    expect(document.activeElement).toBe(wrapper.instance().closeButton)
  })

  test('shift+tab on close button focuses OK button', () => {
    const wrapper = mount(<App />)
    openModal(wrapper)
    fireKeydown(wrapper, wrapper.instance().closeButton, shiftTab)
    expect(document.activeElement).toBe(wrapper.instance().okButton)
  })

  test('shift+tab on heading focuses OK button', () => {
    const wrapper = mount(<App />)
    openModal(wrapper)
    fireKeydown(wrapper, wrapper.instance().modalHeading, shiftTab)
    expect(document.activeElement).toBe(wrapper.instance().okButton)
  })
})

test('escape key closes modal and returns focus to trigger', done => {
  const wrapper = mount(<App />)
  openModal(wrapper)
  fireKeydown(wrapper, wrapper.instance().modalHeading, {
    key: 'Escape'
  })
  setTimeout(() => { // wait a tic for setState to finish
    expect(wrapper.state('open')).toBe(false)
    expect(document.activeElement).toBe(wrapper.instance().trigger)
    done()
  })
})

describe('error validation', () => {
  test('associates error message with input field via aria-describedby', () => {
    const wrapper = mount(<App />)
    openModal(wrapper)
    wrapper.find('.ok-button').at(0).simulate('click')
    expect(wrapper.instance().input.getAttribute('aria-describedby')).toBe('field-error')
  })

  test('focuses the input', () => {
    const wrapper = mount(<App />)
    openModal(wrapper)
    wrapper.find('.ok-button').at(0).simulate('click')
    expect(document.activeElement).toBe(wrapper.instance().input)
  })

  test('closes modal given an input value', () => {
    const wrapper = mount(<App />)
    openModal(wrapper)
    wrapper.instance().input.value = 'Hello world'
    wrapper.find('.ok-button').at(0).simulate('click')
    expect(document.activeElement).toBe(wrapper.instance().trigger)
  })
})