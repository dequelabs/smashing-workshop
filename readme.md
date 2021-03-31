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

- [`node.js`](https://nodejs.org/en/) version 14 or greater.
- [`yarn`](https://yarnpkg.com/) package

### Be sure to install:

- node version 14+
- yarn

## Setup

### Install dependencies

```sh
yarn
```

### Start development server

```sh
yarn start
```

### Run e2e tests

```sh
yarn test:e2e
```

**NOTE**: axe-core is run automatically in each of the e2e test cases' states (in the [`afterEach` call](./cypress/support/index.js#L31-L33))

## Workshop!

Go ahead and run your local dev server (`yarn start`). Feel free to play around with the app and get familiar with it.

### Component structure

- `src/index.js` is the entry point to the app. It handles rendering the whole app and, when not in production, will include [`@axe-core/react`](https://www.npmjs.com/package/@axe-core/react)
- `containers/App/index.js` handles the "states" of the `<App />` component. It's sole purpose is to handle state and pass relevant props down to `components/App/index.js`
- `components/App/index.js` renders the "structure" of the app. It is where the global navigation/skip link/main elements live.
- `components/Stats/index.js` is where the recipe stats live ("X eggs used", "Y recipes made", etc.)
- `components/Recipes/index.js` is where the recipe tiles live. It also instantiates the view/edit modals for each recipe.
