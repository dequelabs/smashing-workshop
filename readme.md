# Smashing Conf Freiburg Germany 2019 Workshop

> How To Translate Wireframes Into Accessible HTML/CSS

## Prerequisites

A basic understanding of the following:

- Git
- HTML
- CSS
- JS
- Node/npm
- React (optional)

Don't worry if you're lacking any of the above, we will walk you through every step of the process so all you have to do is follow along. Feel free to pair up with another attendee!

## Getting started

### Cloning the repo

```sh
$ git clone https://github.com/dequelabs/smashing-workshop.git
```

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
# This causes issues on some machines - see https://github.com/facebook/create-react-app/issues/4540#issuecomment-393268543 for potential easy fix
```

## Milestone 1: Modal dialog focus management

We have a basic modal built out but it is missing some signifcant functionality in terms of accessiblity.

**Open up `src/components/App/index.js` and `src/components/App/index.test.js`**

### Requirements:

Trapping focus can be really easy. There is no need to handle keydowns on **every single focusable element** within the modal...Instead, we can simplify the approach by "focusing" (get it?) on the boundaries of the modal, or the first and last focusable elements.

- [x] shift focus to the modal when it is launched
- [ ] given a <kbd>tab</kbd> keydown on the last focusable item in the modal, the "OK" button, focus the first focusable item in the modal, the "X" (Close) button.
- [ ] given a <kbd>shift+tab</kbd> keydown on the modal's heading OR the "X" (Close) button, focus the last focusable item in the modal, the "OK" button
- [ ] close modal and return focus to button which launched it when <kbd>esc</kbd> is pressed
