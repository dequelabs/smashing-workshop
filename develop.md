# Implementing the app

## Setup

### clone repository

```sh
git clone git@github.com:dequelabs/smashing-workshop.git
```

### install dependencies

```sh
npm i
# yarn
```

## Run the app

This application is written in react, if you prefer something else, feel free to set that up now. The one requirement is that you end up with your app built into `dist/` (and `dist/index.html`!). We will start a static server for `dist` to run our tests.

If you go with something other than react, the baseline for the application is located in the `static/` directory (just plain old html/css)

```sh
npm start
# yarn start
```

## Toolkit

This application is equipped with cauldron, deque's open source pattern library.

- [cauldron-react](https://github.com/dequelabs/cauldron-react) / [cauldron-react demo app](https://dequelabs.github.io/cauldron-react/)
- [deque-pattern-library](https://github.com/dequelabs/pattern-library) / [dqpl demo app](https://pattern-library.dequelabs.com)

You will find the css assets of `deque-pattern-library` included in the entrypoint of this app, `src/index.js`

## Run the tests

```sh
npm run test:dev
# yarn test:dev
```

Notice that we have some failures, let's change that!

## Implementing the stats/metrics...

- The data is located in `src/data.js`.
- You can find icons for each metric in `src/img/icons`.
- The css is located in `src/components/Stats/index.css`.

### Example egg count getter:

```js
const eggCount = recipes.reduce((totalEggs, recipe) => {
  const recipeEggCount = recipe.ingredients.reduce((recipeEggs, ingredient) => {
    const match = ingredient.match(/(\d+)\s+egg/);
    if (match && match[1]) {
      return recipeEggs + Number(match[1]);
    }

    return recipeEggs;
  }, 0);

  return totalEggs + recipeEggCount;
}, 0);
```

Notice that we have more tests passing!

## Implementing the card component...

- You can find images for each recipe in `src/img/food`.
- The css is located in `src/components/Recipes/index.css`.

## Implementing the view recipe modal...

- The css is located in `src/components/RecipeModal/index.css`
- Cauldron has components for the modal, inputs, and checkboxes:
  - **react**: `<Modal />`, `<Button />`, `<TextField />` and `<Checkbox />` ([cauldron-react demo](https://dequelabs.github.io/cauldron-react/))
  - **js (vanilla)**:
    - [fields](https://pattern-library.dequelabs.com/components/fields)
    - [checkboxes](https://dequelabs.github.io/cauldron-react/components/checkbox)
    - [modals](https://pattern-library.dequelabs.com/composites/modals)

```jsx
import {
  Modal,
  ModalContent,
  ModalFooter,
  TextField,
  Checkbox
} from 'cauldron-react';

<Modal
  show={this.state.modalShow}
  heading={{
    text: `Cooking`
  }}
>
  <ModalContent>
    LIST INGREDIENTS/INSTRUCTIONS HERE!
    <TextField
      label="Rate the yumminess (0 - 50)"
      defaultValue={`${recipe.yumminess}`}
      type="number"
      min="0"
      max="50"
    />
    <Checkbox
      checked={recipe.causedGreaseFire}
      value="true"
      id="grease-fire"
      name="grease-fire"
      label="I caused a grease fire making this"
      onChange={onGreaseChange}
    />
  </ModalContent>
  <ModalFooter>PUT CONTROLS HERE!</ModalFooter>
</Modal>;
```

## Implementing the edit recipe modal...

- You should already have the css for this as it is included in the same file as the view recipe modal (`src/components/RecipeModal/index.css`)
- Use the above components to build the edit recipe modal. **Don't forget the form validation!**\
