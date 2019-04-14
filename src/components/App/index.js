import React from 'react';
import { TopBar, Main, SkipLink, MenuItem, Layout } from 'cauldron-react';
import logo from '../../img/icons/logo.svg';
import './index.css';

const App = () => (
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
      </Main>
    </Layout>
  </div>
);

App.displayName = 'App';
export default App;
