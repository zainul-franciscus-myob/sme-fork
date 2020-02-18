# A guide to module testing

The purpose of this document is to inform and guide developers on preferred testing practices for sme-web modules.

> This document will not explore the viability of end-to-end testing as that is a broader topic that extends beyond the sme-web component.

- [A guide to module testing](#a-guide-to-module-testing)
  - [Glossary of terms:](#glossary-of-terms)
  - [What is the responsibility of the module](#what-is-the-responsibility-of-the-module)
  - [What value would module tests provide](#what-value-would-module-tests-provide)
  - [What would be the assertion of a module test](#what-would-be-the-assertion-of-a-module-test)
  - [Side note: module boundaries](#side-note-module-boundaries)
    - [Why are boundaries an important consideration for testing](#why-are-boundaries-an-important-consideration-for-testing)
  - [Testing the layers in the module as a whole](#testing-the-layers-in-the-module-as-a-whole)
    - [1. Autonomous testing:](#1-autonomous-testing)
    - [2. Manual testing:](#2-manual-testing)
  - [Testing layers in conjunction](#testing-layers-in-conjunction)
  - [Testing each layer independently](#testing-each-layer-independently)
  - [What the `phoenix` team has agreed upon](#what-the-phoenix-team-has-agreed-upon)
    - [What do we assert against](#what-do-we-assert-against)
    - [What functions do we test](#what-functions-do-we-test)
    - [How do the tests span across layers](#how-do-the-tests-span-across-layers)

--- 

## Glossary of terms:
- layer: an encapsulated piece of responsibility within the module. For example, our reducer, selectors, view, dispatcher and integrator. 
- workflow: a sequence of actions that a user can take to acheive a certain outcome. For example a user flips the tax inclusive toggle on the invoice page and then selects an item.


---

## What is the responsibility of the module

The module acts as the "controller" of the web component. It's purpose is to act as a mediator between layers and to push/pull information across. For example, it receives information from the UI and dispatches actions to the store.

---

## What value would module tests provide

- act as documentation for complex workflows
- provide confidence in refactoring existing modules
- reduce the need for altering module memory mappings to reproduce and validate complex workflows

---

## What would be the assertion of a module test

Given an event, the assertion would be that the correct pathways occur throughout each layer as expected. Given this requirement, our assertions can be split into multiple approaches. These are: 

- testing all layers in the module in conjunction with one another
- testing various layers in conjuction with one another
- testing each layer indepedently of each other

The focus of the assertions would be aimed towards highly complex workflows. Naturally "complex" is subjective to each developer, but it should look to meet at least one of the following criteria:

- Branching logic
- Cannot be easily handled by memory mapping
- An unintuitive workflow caused by limitations in architecture

---

## Side note: module boundaries

This side note is to re-establish the importance of boundaries within modules. 

![Boundaries](boundaries-scaled.jpg)

A simple user workflow naturally extends throughout the various layers in the module. It's important to understand how each layer interacts with each other as we can then use tests to describe these interactions. This acts as both documentation and regression handling for developers, in order to understand how each egress of a layer interacts with the ingress of another.

### Why are boundaries an important consideration for testing

- Understanding boundaries allows developers to write tests that best document behaviour between layers
- Having tests that are encapsulated within a boundary demonstrate to a developer how to engage with that layer
- Acts as an enforcer for maintaining the boundaries which are a key principle for the project

---

## Testing the layers in the module as a whole

This would involve testing a workflow throughout the entirety of the module. The goal would be, for each workflow, we'd test to the boundary of the module.

*PROS:*
- High guarantee that the workflow executes as we expect throughout the entire module
- A single test represents the entire workflow
- Ensures integration across layers in the module is working as intended

*CONS:*
- The workflow across layers is abstracted and more difficult to understand
- Debugging can be difficult

There are a further two ways in which we can separate the testing strategy. These are manual testing vs autonomous testing.
It's important to explore these options and evaluate their value.

### 1. Autonomous testing: 

> (For an example, look at `StpGetStartedModule.test.js`)

*PROS:*
- Can capture scenarios that aren't easily captured via manual testing
- Enables a TDD approach to development i.e. developers have to build a "slice" of functionality across all layers for the test to pass
- Helps to cohesively map functional requirements to tests
- Will aid in capturing regressions
- Gives confidence when refactoring

*CONS:*
- There'll be a complex test set up
- Maintenance
- May introduce significant test durations 
- Possible conflicts with Feelix 

### 2. Manual testing:

*PROS:*
- Simple to do
- Requires no test maintenance

*CONS:*
- Difficult to test complex workflows, requires manual changes to the default mappings
- Lack of "test" documentation on certain workflows
- Doesn't instill confidence in developers when having to refactor code



## Testing layers in conjunction

This would involve testing a workflow through an integration of certain layers, but not as a whole. The goal would be, for each integration, we'd test to the extent of each boundary within the combination of layers.

*PROS:*
- Allows for greater confidence in complex workflows that span across multiple layers
- Good guarantee that the workflow executes as we expect throughout the combination of layers
- Allows developers to ignore specific layers in the module
- Ensures integration across a combination of layers in the module is working as intended

*CONS:*
- No guarantee that the workflow executes as we expect
- The workflow is abstracted and more difficult to understand in the test
- Doesn't ensure integration across the entire layer in the module is working as intended

Example:

```
  describe('updateGeneralJournalLine', () => {
    it('update line', () => {
      const { module, store } = setUp();
      const lineIndex = 0;
      const lineKey = 'amount';
      const lineValue = '1';

      module.updateGeneralJournalLine(lineIndex, lineKey, lineValue);

      const updatedState = store.getState();
      const updatedLine = updatedState.generalJournal.lines[lineIndex]

      expect(updatedLine.amount).toEqual(lineValue);
    });
  });
```


## Testing each layer independently

This would involve testing a workflow independently within each layer. The goal would be, for each layer, we'd test to the extent of each boundary within that layer, whichs acts as the interface to the next layer.

*PROS:*
- Setting up & writing the tests are quite simple
- Easy to understand the workflow throughout the various layers
- Good guarantee that the workflow executes as we expect throughout each individual layer
- Easier to debug if errors arise
- Allows developers to ignore specific layers in the module (this is a quite important, as in sme-web there has been a deliberate effort to ignore writing UI tests)

*CONS:*
- No guarantee that the workflow executes completely as we expect
- Have a greater amount of tests to maintain
- Doesn't ensure integration across the entire layer in the module is working as intended

Example:

```
  describe('updateGeneralJournalLine', () => {
    it('update line', () => {
      const { module, store } = setUp();
      const lineIndex = 0;
      const lineKey = 'amount';
      const lineValue = '1';

      module.updateGeneralJournalLine(lineIndex, lineKey, lineValue);

      expect(store.hasIntent(UPDATE_GENERAL_JOURNAL_LINE)).toEqual(true);
    });
  });
```


--- 

## What the `phoenix` team has agreed upon

The `phoenix` team has agreed to write tests that span across layers (**Testing layers in conjunction**) but assert against the boundary of a module.

> For reference, look at `GeneralJournalDetailModule.test.js`, `GeneralJournalDetailModule_TaxCalculation.test.js` and `GeneralJournalDetailModule_Save.test.js`

### What do we assert against

- That our module has dispatched an intent or a sequence of intents

```
expect(store.getArrayOfIntents()).toEqual([UPDATE_GENERAL_JOURNAL_LINE]);
```

- That our module has dispatched an action containing a certain field

```
expect(store.getActionForIntent(GET_TAX_CALCULATIONS)).toEqual(
      {
        intent: GET_TAX_CALCULATIONS,
        taxCalculations: expect.any(Object),
      },
    );
```

- That our module has dispatched an integration intent or a sequence of integration intents

```
expect(integration.getIntents()).toEqual([CREATE_GENERAL_JOURNAL]);
```

### What functions do we test

We aim to test functions that are *accessible* to the user i.e. the functions embedded within our UI components that are triggered on user input. These are the functions that are passed down to our `<View>` layer (for example `updateGeneralJournalLine`).

We test these as opposed to other functions in the module, as these functions are what we'd consider *public* use.

### How do the tests span across layers

By virtue of the complexity of some pages, modules may need certain state populated within the store to achieve a certain workflow. For example, in `GeneralJournalDetailModule` the function `openCancelModal` requires the page to be edited beforehand for a modal to appear.

The team identified the following ways of achieiving a specific workflow that is state dependant:
- Mocking the selector
- Injecting state into the store directly
- Executing other functions in the module that populate the state in the required manner

The team has agreed to execute functions in the module to populate the state in the required manner. This implies that we will be implicitly testing some reducer and selector functions alongside our module, to achieve the required populated state.
