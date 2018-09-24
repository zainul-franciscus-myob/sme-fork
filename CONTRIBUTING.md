# Contributing

This document outlines the process for contributing to the `sme-web` repository, and to a lesser degree, the `sme-web-bff` repository.

## Social contract
:heavy_exclamation_mark: Review the [social contract](https://myobconfluence.atlassian.net/wiki/x/7Im5Lw) (Confluence).

## Team board and workflow
1. Work for `sme-web` and `sme-web-bff` is tracked in a [Github project](https://github.com/MYOB-Technology/sme-web/projects/1).

1. Every piece of work to be done by this team must be logged as a card on that project board.<br/>
   Issues should be logged in their respective repo.
    - [`sme-web` issues](https://github.com/MYOB-Technology/sme-web/issues)
    - [`sme-web-bff` issues](https://github.com/MYOB-Technology/sme-web-bff/issues)

1. Issues are moved on the board by raising a pull request, and referencing the related issue.<br/>
   When the pull request is merged, the issue will transition to the next place on that board.<br/>
   > :thought_balloon: There may be some rare circumstances where a pull request is not necessary. Usually this would be for issues where no actual code changes or commits need to be made to the `sme-web` or `sme-web-bff` repo(s).
   
   > :page_facing_up: When creating an issue or pull request, read through the template to understand which information we recommend you submit, for the process to go most smoothly.

## Stories and Task Wall Process
Wall columns | Todo | Doing | Done
------------ | ---- | ----- | ----
Description	| Contains **sprint backlog stories or tasks** | Contains stories or tasks that are in **development**, **designing** or **testing**.<br/>**WIP Limit: 4**  | Contains **stories or tasks** that have been **merged into master branch.**
Exit criteria | •**3 amigos kickoff**<br/><br/> Discuss &amp; understand:<br/> • **Acceptance Criteria**<br/> • **Designs**<br/> • **User experience** (e.g. gold / purple)<br/> • **Context and value** (who, why, what)<br/> • **List of sub-tasks**<br/> • **Out-of-scope items**<br/> • **Who was present at kickoff**<br/> • **What reviews are required** (code, design, A/C, tests) | • **Completed all required reviews** that were identified during kickoff (code, design, A/C, tests)<br/> • **Code merged into master**

## Architecture Do's and Dont's
### Render Layer (e.g. `<ThingSelector />`)
#### Do
  - Use props to pass around event handlers<br/>e.g.
    ```javascript
    <ThingSelector
      onMyThingSelected={(thing) => { /* handle the event */ }}
    />
    ```
    
#### Don't
  - Do any asynchronous data fetching directly.

----

### Module Layer (e.g. `ThingModule`)
#### Do
  - Put plumbing here, to orchestrate mapping React event handlers to Integration reads and writes.
  
#### Don't
  - Do anything else.

----

### Integration Layer (e.g. `HttpIntegration`, `MemoryIntegration`)
#### Do
  - Make asynchronous HTTP request **from the `HttpIntegration` only**
  - Minimal protocol-specific transformations (handling HTTP status codes)
  
#### Don't
  - Do any business logic here.

## Naming Conventions
### CSS
#### classes - dash-case
example: `banking-view`
### Javascript
#### React component file - TitleCase
example: `BankingTransactionsView.js`
#### Json file - camelCase
example: `bankingTransactions.json`
#### Tests files - {fileName}.test.js
Located under `__tests__` file
example - `BankingTransactionsView.test.js`

#### Files exporting classes / function library / multiple exports / objects - PascalCase
example: `BankingIntents.js`
#### Files exporting functions - camelCase
example: `bankingReducer.js`
#### File names need to reflect the name of the const being exported
example: `BankingIntents.js` `export default BankingIntents;`

### Variables
#### Local - camelCase
example `myVariable = foo`
#### Global - CAPITAL_CASE
example `BIG_GLOBAL`
#### Class - TitleCase
example - `BankingTransactionsView`
### API
#### contract keys - camelCase
example:
```javascript
{ 'referenceId': '001' }
```
#### contract values - String
example:
```javascript
{ 'referenceId': '001' }
```
