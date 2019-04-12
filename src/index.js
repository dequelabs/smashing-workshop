import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './containers/App';
import './index.css';
import 'deque-pattern-library/dist/css/pattern-library.min.css';
import 'cauldron-react/dist/cauldron-react.css';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}

render(<App />, document.getElementById('app'));
