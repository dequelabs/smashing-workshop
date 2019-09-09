import React, { Component, Fragment } from 'react';
import { TopBar, Main, SkipLink, MenuItem, Layout, Button, Link } from 'cauldron-react';
import Modal from '../Modal'
import logo from '../../img/icons/logo.svg';
import './index.css';

export default class App extends Component {
  state = {
    open: false
  }

  setHeadingRef = el => this.modalHeading = el
  setTriggerRef = el => this.trigger = el
  setOkButtonRef = el => this.okButton = el
  setCloseButtonRef = el => this.closeButton = el
  setMainRef = el => this.main = el
  
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
    const { modalHeading, okButton, closeButton } = this;
    console.log('TODO: Handle keydowns! (trap focus etc...)')
  }

  render() {
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
                    onClick={this.onClose}
                    buttonRef={this.setOkButtonRef}
                  >
                    OK
                  </Button>
                )}
                show={this.state.open}
              >
                <p>This is where our view/edit recipe content will go</p>
                <div><Link href="#">dummy focusable #1</Link></div>
                <div><Link href="#">dummy focusable #2</Link></div>
                <div><Link href="#">dummy focusable #3</Link></div>
                <p>Lorem ipsum and stuff</p>
              </Modal>
              <p>Lorem ipsum blah blah...<a href="#">pointless link</a></p>
            </div>
          </Main>
        </Layout>
      </div>
    )
  }
}