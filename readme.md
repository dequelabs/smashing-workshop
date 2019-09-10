# Smashing 2019 Workshop

## NOTE: This is the broken branch. It intentionally has a11y issues:

- generic title (page info tool)
- stats icons have generic/non-descriptive accNames of "decorative icon" (images tool)
- trash buttons have bad accNames of "trash can icon" (n/r/v tool)
- all the edit buttons are divs instead of buttons (n/r/v tool)
- edit modal form fields have non-unique labels (forms tool)
- yumminess field has no label (forms tool)
- yumminess field's error is non-descriptive (forms tool)
- recipe card images are not marked as decorative properly (`alt=""`)

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

# Milestone III: Enter axe (pro)

Let's run axe pro on our broken build and see what we can find and fix.

## State #1: default state

Axe gives us several color contrast issues and a bunch of image alt issues. Looking back on our wireframes, let's mark these images up properly and update the text color of "Beginner" to get our desired axe clean (0 violations)!

Lets save our results and run the following tools:

- page info
- images
- headings
- buttons and links

## State #2: view recipe modal

- Axe gives us a single new issue: "Form elements must have labels"

- **solution**: associate the visible label ("Rate the yumminess (0 - 50)") with the form field.
- save results and run the forms tool and see if we can catch anything else!

## State #3: edit recipe modal

- we've got axe clean!!! but we're not done yet :)
- run the buttons and links tool and fix associated issues
- run the forms tool on **1** of the form fields
