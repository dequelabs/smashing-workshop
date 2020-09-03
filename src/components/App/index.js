import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TopBar, Main, SkipLink, MenuItem, Layout } from 'cauldron-react';
import logo from '../../img/icons/logo.svg';
import './index.css';

const Modal = ({ onClose }) => {
  const heading = useRef(null);
  const close = useRef(null);
  const cancel = useRef(null);
  const onKeyDown = e => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'Tab':
        if (e.shiftKey && [heading.current, close.current].includes(e.target)) {
          e.preventDefault();
          cancel.current.focus();
        } else if (!e.shiftKey && e.target === cancel.current) {
          e.preventDefault();
          close.current.focus();
        }
        break;
    }
  };

  useEffect(() => {
    heading.current.focus();
    document.getElementById('app').setAttribute('aria-hidden', 'true');
  }, []);

  const modalContent = (
    <div role="dialog" aria-labelledby="recipe-name" onKeyDown={onKeyDown}>
      <button
        ref={close}
        onClick={onClose}
        aria-label="Close"
        className="close"
      >
        x
      </button>
      <h2 ref={heading} id="recipe-name" tabIndex={-1}>
        Recipe name
      </h2>
      <ul>
        <li>foo</li>
        <li>bar</li>
        <li>baz</li>
      </ul>
      <button>save</button>
      <button ref={cancel} onClick={onClose}>
        cancel
      </button>
    </div>
  );
  return createPortal(modalContent, document.getElementById('modal'));
};

const App = () => {
  const [open, setOpen] = useState(false);
  const didMount = useRef(false);
  const trigger = useRef(null);
  const onClick = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (!open) {
      document.getElementById('app').removeAttribute('aria-hidden');
      trigger.current.focus();
    }
  }, [open]);

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
        <Main id="main-content" aria-labelledby="main-heading" tabIndex={-1}>
          <div className="App__head">
            <div className="confined">
              <h1 id="main-heading">Recipe Dashboard</h1>
            </div>
          </div>
          <div className="App__body">
            <button ref={trigger} onClick={onClick}>
              Trigger Modal!
            </button>
          </div>
          {open && <Modal onClose={onClose} />}
        </Main>
      </Layout>
    </div>
  );
};

export default App;
