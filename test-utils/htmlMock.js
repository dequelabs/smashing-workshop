'use strict';

const path = require('path');
const { readFileSync } = require('fs');
const html = readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');
const [snippet] = html
  .split('<body class="dqpl-no-sidebar">')[1]
  .split('<script src="index.js"></script>');

module.exports = snippet;
