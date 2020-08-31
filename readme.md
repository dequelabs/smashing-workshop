# Smashing 2019 Workshop

## NOTE: This is the broken branch. It intentionally has a11y issues:

<details>
  <summary>view intentional accessibility issues</summary>

- generic title (page info tool)
- stats icons have generic/non-descriptive accNames of "decorative icon" (images tool)
- trash buttons have bad accNames of "trash can icon" (n/r/v tool)
- all the edit buttons are divs instead of buttons (n/r/v tool)
- edit modal form fields have non-unique labels (forms tool)
- yumminess field has no label (forms tool)
- yumminess field's error is non-descriptive (forms tool)
- recipe card images are not marked as decorative properly (`alt=""`)

</details>

## Prerequisites

A basic understanding of the following:

- HTML
- CSS
- JS
- Node/npm
- React

Don't worry if you're lacking any of the above, we will walk you through every step of the process so all you have to do is follow along. Feel free to pair up with another attendee!

## Setup

### Install dependencies

```sh
yarn
# or npm install
```

### Start development server

```sh
yarn start
# or npm start
```

### Run e2e tests

```sh
yarn test:e2e
# npm run test:e2e
```

**NOTE**: axe-core is run automatically in each of the e2e test cases' states (in the [`afterEach` call](./cypress/support/index.js#L31-L33))
