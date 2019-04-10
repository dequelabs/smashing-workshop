import React, { Component } from 'react';
import { TopBar, Main, SkipLink, MenuItem, Layout } from 'cauldron-react';
import Stats from '../Stats';
import Recipes from '../Recipes';
import { getStats } from '../../utils';
import { getData } from '../../data';
import './index.css';

export default class App extends Component {
  constructor() {
    super();
    const data = getData();
    this.state = {
      recipes: data,
      stats: getStats(data)
    };
  }

  refresh = () => {
    const updatedData = getData();
    this.setState({
      recipes: updatedData,
      stats: getStats(updatedData)
    });
  };

  render() {
    const { stats, recipes } = this.state;
    return (
      <div className="App">
        <SkipLink target={'#main-content'} />
        <TopBar>
          <MenuItem>awesome recipes</MenuItem>
        </TopBar>
        <Layout>
          <header>
            <div className="confined">
              <h1>Recipe Dashboard</h1>
            </div>
          </header>
          <Main id="main-content" tabIndex={-1}>
            <Stats stats={stats} />
            <Recipes recipes={recipes} refresh={this.refresh} />
          </Main>
        </Layout>
      </div>
    );
  }
}
