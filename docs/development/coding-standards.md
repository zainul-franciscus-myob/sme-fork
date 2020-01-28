# Coding standards

Our coding standards for developers contributing to the codebase

See [linting-and-styles.md](/docs/linting-and-styles.md) for our JS and CSS linting configuration and commands

## Architecture Do's and Dont's

### Render Layer (e.g. `<ThingSelector />`)

#### Do

-   Use props to pass around event handlers<br/>e.g.
    ```javascript
    <ThingSelector
      onMyThingSelected={(thing) => { /* handle the event */ }}
    />
    ```

#### Don't

-   Do any asynchronous data fetching directly.

### Module Layer (e.g. `ThingModule`)

#### Do

-   Put plumbing here, to orchestrate mapping React event handlers to Integration reads and writes.

#### Don't

-   Do anything else.

### Integration Layer (e.g. `HttpIntegration`, `MemoryIntegration`)

#### Do

-   Make asynchronous HTTP request **from the `HttpIntegration` only**
-   Minimal protocol-specific transformations (handling HTTP status codes)

#### Don't

-   Do any business logic here.

### Business logic

#### Do

-   Push business logic below the SEAM

#### Don't

-   Handle business logic in the UI

## Javascript

### Environment

make sure to use the correct versions of `node` & `yarn` specified in [package.json](/package.json)

### General

-   We aim to be dry within a silo, but "wet" across them. See `Vertical Domain Silos` section of [overview.md](/docs/overview.md) for more information
-   We aim to not have classes where simple functions would do
-   We aim to use new Javascript syntaxes (ES6+)

### React/state management

-   Prefer functional components over classes
-   Avoid complex components, eg. having more logic than simple if/else
-   Avoid components with internal state
-   Avoid domain logic in the UI
-   Avoid calculation in the UI
-   Use existing shared components/functionalities (for instance `src/components/handlers`) instead of reinventing the wheel
-   Use `integrator`/`dispatcher` patterns for state management and fetching data respectively.
-   Write tests only when needed:
    -   selectors
    -   reducers (where logic exists)
    -   single render test for a view, no further test for UI components

## CSS

### CSS variables

Avoid having magic values in CSS for UI elements such as padding, margin, colors, use [Feelix's design tokens](https://feelix.myob.com/#/Design%20tokens) instead

Feelix design tokens are not available with the version we're using, so to be able to use any of the design tokens above, we need to add it to our [global css](/src/index.css) with the exact name so that they can be removed later when they're avaible through a Feelix upgrade

See [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for usage guide

### rem

Use `rem` instead of `px` or anything else unless it's not possible

### Feelix defaults over custom CSS

There must be a really good reason to introduce custom CSS instead of utilising the styles that Feelix provides

### CSS selectors

-   avoid targeting Feelix specific classes
-   use css-module's `local` instead of global css, css-module is enabled by default for files ending with `.module.css`
-   avoid selecting specific elements by using multiple level selectors unless necessary, see below for example

Do:

    .parent {
      ...
    }

    .child {
      ...
    }

Don't:

    .parent .child{
      ...
    }

## Naming Conventions

### CSS

#### classes - camelCase

example: `.bankingView`

### Javascript

#### React component file - TitleCase

example: `BankingTransactionsView.js`

#### Json file - camelCase

example: `bankingTransactions.json`

#### Tests files - **tests**/{fileName}.test.js

example - `/banking/__tests__/BankingTransactionsView.test.js`

#### Files exporting classes / function library / multiple exports / objects - PascalCase

example: `BankingIntents.js`

#### Files exporting a default function - camelCase

example: `bankingReducer.js`

#### File names need to reflect the name of the const being exported

example: `BankingIntents.js` -> `export default BankingIntents;`

### Variables

#### Local - camelCase

example `myVariable = foo`

#### Constant/Symbol - CAPITAL_CASE

example `BIG_GLOBAL`

#### Class - TitleCase

example - `BankingTransactionsView`

### API

#### contract keys - camelCase

example:

```javascript
{ 'referenceId': '001' }
```

#### contract values - String unless it's used in calculations

example:

```javascript
{ 'referenceId': '001' }
```
