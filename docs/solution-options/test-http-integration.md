# Testing in Http Integration

The purpose of this document is to outline options for testing `createHttpIntegration.js`.

---

## What does `createHttpIntegration.js` do?

This is the place where all our integration calls get made (read and write).

---

## What value could tests provide

- provide faster feedback when something does go wrong
- increase confidence in a very important part of software

---

## Problem context

An incident occurred where no files were getting uploaded in all modules. Had to deduce that it must have been integration affecting them all. Took a long while to discover the bug. It was due to a recent change, where someone had mistakenly wired up `writeFormData` to `write`. 

The aim is to avoid such bugs, or at the least be able to detect them easily.

---

## How comprehensively should we test?
The following options were discussed with the team and option 1 has been decided for now.

### 1] Unit tests with mocks
Approach: 
Mock `fetch` and `xhr` to test that the 5 requests made are as expected, and the response received is parsed and passed to the correct callback function.

*PROS:*
- Provides sufficient confidence by covering the most important interactions
- Can help pinpoint which request or response has an issue when a bug is encountered
- Expected behaviour clear in tests


*CONS:*
- Mocking `fetch` and `xhr` does not lead to very easy to read tests, thus readucing maintainability of codebase.
- Does not cover all the branches possible (for example the if logic in xhr requests)
- Test tied to implementation (fetch, xhr)

Notes: 
- It was discussed whether unit tests should be more comprehensive, including things like the if logic in xhr requests. However, currently that does not seem to provide much value when balanced against how it would make the tests noisier and harder to be maintained. Also, this is not a file that often gets changed, so a basic smoke test gives enough confidence.
- It was also discussed whether unit tests should be less comprehensive (for example only testing the request in write methods and only testing the response in read methods). The team thought that this would not cover the most important interactions. Testing that the right request is being sent and the right response received, confirms an end-to-end flow. 


### 2] Smoke test with fake bff (external server)

Approach:
A simple Express server that has 5 endpoints (/read, /readFile, etc.) will return a response as expected by integration

*PROS:*
- simple tests, send  request and expect a response
- test not tied to implementation (abstracted away from fetch and xhr)

*CONS:*
- This higher level confidence is already received from browser tests
- Might take long to spin up (could be run on a separate pipeline)
- Will have to keep up to date with bff implementation

### 3] Test actual integration accepts request and sends response

*PROS*
- High confidence

*CONS*
- Already covered by browser tests
- Test too dependent on real business data, which is likely to change
- Quite slow to spin up

### 4] Do Nothing
Reason: This file is not very likley to be changed, less chance of bugs

*PROS:*
- No effort required

*CONS:*
- Hard to debug when there is a bug in this file
- It is a very important file that affects almost all other modules (impact of bug is higher)
