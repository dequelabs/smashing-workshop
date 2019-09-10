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

## Milestone 2: Error validation

We have a basic modal built out with a single form field and some basic error validation to handle submitting modal form with empty input.

**Open up `src/components/App/index.js` and `src/components/App/index.test.js`**

### Requirements:

- [x] close modal given a successful submission
- [ ] associate the error message with the input via aria-describedby
- [ ] shift focus to the input given an erroneous form submission
- [x] close the modal given a successful form submission (an input with a value)
