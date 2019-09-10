import React, { Component, Fragment } from 'react';
import { TopBar, Main, SkipLink, MenuItem, Layout, Button, Link } from 'cauldron-react';
import Modal from '../Modal'
import logo from '../../img/icons/logo.svg';
import './index.css';
import classNames from 'classnames';

export default class App extends Component {
  state = {
    open: false,
    error: null
  }

  setHeadingRef = el => this.modalHeading = el
  setTriggerRef = el => this.trigger = el
  setOkButtonRef = el => this.okButton = el
  setCloseButtonRef = el => this.closeButton = el
  setMainRef = el => this.main = el
  setInputRef = el => this.input = el
  
  onOpen = () => {
    this.setState({ open: true }, () => {
      this.modalHeading.focus()
    })
  }
  
  onClose = () => {
    this.setState({ open: false })
    this.trigger.focus()
  }

  /**
   * Traps focus within modal
   * 
   * NOTE: For the ease of testing this, let's utilize `e.key`, `e.target` and `e.shiftKey`
   */
  onKeyDown = e => {
    const { key, target, shiftKey } = e
    const { modalHeading, okButton, closeButton } = this
    
    switch (key) {
      case 'Tab':
        if (target === okButton && !shiftKey) {
          e.preventDefault();
          closeButton.focus()
        } else if ((target === closeButton || target === modalHeading) && shiftKey) {
          e.preventDefault();
          okButton.focus()
        }
        break

      case 'Escape':
        this.onClose()
        break
    }
  }

  /**
   * Handle the form submission. Sets error state if input is blank
   * 
   * NOTE: The input we want to focus is `this.input`
   */
  onSubmit = e => {
    e.preventDefault()
    const hasError = !this.input.value
    this.setState({
      error: hasError ? 'Instruction must not be blank' : null
    })

    if (!hasError) {
      return this.onClose()
    }
  }

  render() {
    const { error } = this.state

    return (
      <div className="App">
        <SkipLink target={'#main-content'} />
        <TopBar role="banner">
          <MenuItem>
            <img alt="" role="presentation" src={logo} />
            <span>awesome recipes</span>
          </MenuItem>
        </TopBar>
        <Layout>
          <Main
            mainRef={this.setMainRef}
            id="main-content"
            aria-labelledby="main-heading"
            tabIndex={-1}
          >
            <div className="App__head">
              <div className="confined">
                <h1 id="main-heading">Recipe Dashboard</h1>
              </div>
            </div>
            <div className="App__body">
              <Button
                onClick={this.onOpen}
                buttonRef={this.setTriggerRef}
              >
                Trigger Modal!
              </Button>
              <Modal
                onKeyDown={this.onKeyDown}
                header={(
                  <Fragment>
                    <h2 tabIndex={-1} ref={this.setHeadingRef}>Recipe</h2>
                    <button
                      className="dqpl-close dqpl-icon"
                      type="button"
                      aria-label="Close"
                      onClick={this.onClose}
                      ref={this.setCloseButtonRef}
                    >
                      <div className="fa fa-close" aria-hidden="true" />
                    </button>
                  </Fragment>
                )}
                footer={(
                  <Button
                    className="ok-button"
                    onClick={this.onSubmit}
                    buttonRef={this.setOkButtonRef}
                  >
                    OK
                  </Button>
                )}
                show={this.state.open}
              >
                <form className="dqpl-field-wrap" onSubmit={this.onSubmit}>
                  <label className="dqpl-label" htmlFor="instruction-1">Instruction #1</label>
                  <input
                    className={classNames('dqpl-text-input', {
                      'dqpl-error': error
                    })}
                    type="text"
                    id="instruction-1"
                    aria-invalid={!!error}
                    ref={this.setInputRef}
                  />
                  {error && (
                    <div className="dqpl-error-wrap" id="field-error">{error}</div>
                  )}
                </form>
              </Modal>
              <p>Lorem ipsum blah blah...<a href="#">pointless link</a></p>
            </div>
          </Main>
        </Layout>
      </div>
    )
  }
}