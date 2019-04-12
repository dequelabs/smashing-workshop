# Smashing 2019 Workshop

> How To Translate Wireframes Into Accessible HTML/CSS

[smashing conference workshop website](https://smashingconf.com/sf-2019/workshops/deque)

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

### Run unit tests

```sh
yarn test
# npm test
```

with watcher:

```sh
yarn test --watch
# npm test -- --watch
```

## Exercise 1: <Stats /> (`src/components/Stats`)

```sh
git checkout exercise-1
```

Now that we've seen the designs for the stats/metrics section, let's build it! The first thing we should focus on is each stat's icon.

### 1a. Decorative Images

[wai decorative images tutorial](https://www.w3.org/WAI/tutorials/images/decorative/)

> the information provided by the image might already be given using adjacent text

A decorative image is an image which doesn't add information to the context of the page. In this case, our egg/recipe/fire icons have adjacent text which conveys the important information regarding the given metric.

This means that we want to ensure our icons follow this pattern:

```html
<img src="foo.png" alt="" role="presentation" />
```

**Go ahead and implement the images as decorative!**

### 1b. Live Regions

- [aria-live](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-live)
- [aria-atomic](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-atomic)
- [aria-relevant](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-relevant)

Given the requirement that any edits to a recipe should be immediately reflected in the stats section, we need to notify assistive technology of any updates.

For this, we will utilize aria live regions. Using `aria-live="polite"` allows us to ensure the updates don't interrupt other important read outs. In addition, `aria-relevant="all"` tells AT to inform the user of **any** change. Lastly, `aria-atomic="true"` tells AT to read the entire content of the changed element which means the user will be informed _"5 eggs used"_ rather than just _"5"_.

**Go ahead and implement the stats as live regions!**

## Exercise 2: <RecipeModal /> (`src/components/RecipeModal` and `src/containers/RecipeModal`)

```sh
git checkout exercise-2
```

### 2a. Descriptive accessible label of each text field

Each text field needs to have a uniquely identifiable label. That way, AT users are able to easily understand the purpose of the teext field.

**Pro tip**: when on a form, open up the VoiceOver rotor menu and use the right arrow to navigate to the "Form Controls" section.

Per the designs, we should increment a user-friendly number for each text field (within it's given section - ingredients / instructions).

**Go ahead and implement the unqiue text field labels!**

### 2b. Accessible name of the delete (trash icon) buttons

Each delete button should have a **unique** accessible name. The reason we can't just settle for slapping `aria-label="Remove"` on each button is that the user should be provided context that is otherwise conveyed through visual proximity. The ideal accessible name for our delete buttons is `aria-label="Remove {name of field}"`. Referring back to the designs, we have a requirement to increment the accessible name of each button, so we should be left with `aria-label="Remove ingredient 1"`, `aria-label="Remove ingredient 2"`, and so on...

**Go ahead and add a unique accessible name to each delete button (via `aria-label`)!**

### 2c. Form validation

[wai form validation tutorial](https://www.w3.org/WAI/tutorials/forms/validation/)

We should not allow the user to submit the edit recipe form with empty text fields (ingredients/instructions). If the user does submit the form with empty inputs, we should inform them of the error. Our form validation should consist of the following:

- adding `aria-invalid="true"` to each erroneous field
- a descriptive error should be added in close proximity to the erroneous field.
- each error message should be assigned a unique id
- each erroneous field should be associated with its error message via `aria-describedby`

I know what you're thinking - that sounds like a ton of work! Don't worry, the cauldron-react `<TextField />` component will handle all of that for us. Our task here is to write validation for the ingredient and instruction text fields and feed our errors into the `<TextField />` component.

#### Example `<TextField />` with `error` prop:

```jsx
<TextField required label={`Foo`} error="Foo is required!" />
```

We have already set everything up for you to write the validation...

**Update the `validate` method of the `RecipeModal` container (`src/containers/RecipeModal.js`).**

# Run end-to-end tests (watches)

```sh
yarn test:e2e
# npm run test:e2e
```
