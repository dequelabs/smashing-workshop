# Deque Workshop

> Translating Design Wireframes into Accessible HTML/CSS

## Prerequisites

A basic understanding of the following:

- Git
- HTML
- CSS
- JS
- Node/npm
- React

Don't worry if you're lacking any of the above, we will walk you through every step of the process so all you have to do is follow along. Feel free to pair up with another attendee!

## Getting started

### Cloning the repo

```sh
$ git clone https://github.com/dequelabs/smashing-workshop.git
```

### Install dependencies

```sh
yarn
# or npm install
```

### Let's begin!

1. `yarn start` (if you're not using yarn, run `npm start`)
1. navigate to [http://localhost:1234](http://localhost:1234)
1. poke around and see what we've got so far!

#### Building the card component

:sparkle: Let's bust out those handy annoted wireframes!

<details>
  <summary>text alternative of annotations (spoiler alert!)</summary>

- card should be `277px` wide
- image of recipe should be marked as "decorative"
  - `alt=""` and/or `role="presentation"`
- image of recipe should be `142px` in height
- render a pencil icon control which will eventually invoke the edit recipe modal
- the recipe name should be an `<h3 />`
- the recipe metadata (prep time, bake time, difficulty) should be marked as a table (or `<dl />`)
  - the table headers (or `<dt />`):
    - `color: #666`
    - `font-size: 18px`
  - the table cells (or `<dd />`):
    - `color: #333`
    - `font-size: 18px`
    - `font-weight: 500`
  - the difficulty table cell (or `<dd />`):
    - should be `#76bf98` for beginner (which is all we're building for now)
- the card content (h3 / table) should be `73px` in height
  - `background: #fff`
- card footer should be a button with the text `Cook {recipe.name}`
  - `background: #3C7AAE`
  - `color: #fff`
  - ¡extra credit! - `[` `]` focus indication (you will have to get creative here)
    - `3px`
    - `color: #fff`
    - `1px` offset (from edge of button)

</details>

#### Testing our card component

- Automated testing via the [axe extension](https://www.deque.com/axe/)
- Intelligent Guided Testing
- Unit testing
