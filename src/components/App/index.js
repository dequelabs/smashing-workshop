import React, { Component, Fragment } from 'react';
import {
  TopBar,
  Main,
  SkipLink,
  TopBarItem,
  Layout,
  Button,
  Link
} from '@deque/cauldron-react';
import data from '../../data';
import logo from '../../img/icons/logo.svg';
import cake from '../../img/food/cake.png';
import './index.css';

const App = () => {
  const [recipe] = data;

  return (
    <div className="App">
      <SkipLink target={'#main-content'} />
      <TopBar role="banner">
        <TopBarItem>
          <img alt="" role="presentation" src={logo} />
          <span>awesome recipes</span>
        </TopBarItem>
      </TopBar>
      <Layout>
        <Main id="main-content" aria-labelledby="main-heading" tabIndex={-1}>
          <div className="App__head">
            <div className="confined">
              <h1 id="main-heading">Recipe Dashboard</h1>
            </div>
          </div>
          <div className="App__body">
            <div className="App__card">
              <img src={cake} />
              <h2>TODO!</h2>
            </div>
            <p>
              Lorem ipsum blah blah...<a href="#">pointless link</a>
            </p>
          </div>
        </Main>
      </Layout>
    </div>
  );
};

export default App;
