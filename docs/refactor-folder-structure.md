### Problem Statement

* Currently, we have a number of functional pieces of functions that are repeated throughout the different modules (along with their tests)
  e.g. getExpiredDate (used in Bill, Invoice, and Quote pages), valueFormatters functions, blobOpener
  * Do we want to have a common place to put these functions in so that they're reusable across different modules (as well as their tests)? From the tech huddle discussion, the outcome was the team was interested in extracting out common functional functions into a common area, but more investigation was needed on `where` this common folder would be and what it should be called. This leads to the second point below.

* Our folder structure is very flat at the moment. All the page modules as well as other parts of the codebase such as the `store`, `integration`, common `components`, additional services like `leanEngage`, `hotKeys` are all mixed in together.
  * Do we want to restructure the folders so that all the feature modules are under a single `modules` directory, and the other services will be at the same level as the `modules` folder? 

### SOLUTION OPTIONS:

**Option 1**

- Keep everything as is, except:
  * Move `getExpiredDate` as a functional function into a `common` folder along with its relevant tests
  * Add the other two common functions that are existing in their silo folders at the moment to this `common` folder (i.e. `valueFormatters` and `blobOpener`)

- PROs: 
  * There's a common place to put common functional functions with their tests
  * Reduce code duplication (code & tests)
  * Changes to logic can be done in one place

- CONS:
  * The name `common` might invite misuse (it could become a dumping ground?) => Solution: Devs to become vigilant with what goes into this folder?

**Option 2**

- Restructure the `src` folder to have:
  -- modules (all current feature folders will move here - excluding integration related files which should still stay in integration)
  -- common
  
  -- components
  -- integration
  -- store
  -- ... rest of existing folders (e.g. leanEngage, telemetry, etc.)

- PROS:
  * The feature modules are confined to one area, which makes it easier to track which folders are for feature pages, and which are for additional services surrounding the feature modules

- CONS:
  * Big restructuring/refactoring efforts
  * The name `common` might invite misuse (it could become a dumping ground?) => Solution: Devs to become vigilant with what goes into this folder?

**Option 3**

- Same as option 2, but additionally:
  * Try to move the `MemoryMapping` and `HttpMapping` and its canned data into the feature module folder (like in the BFF)

- PROS:
  * When developing a feature, all the necessary parts are in one place (module, selectors, reducers, view, integration) - except for `route` and `nav`. This makes developing and maintenance easier to follow.

- CONS:
  * Big restructuring/refactoring efforts
  * The name `common` might invite misuse (it could become a dumping ground?) => Solution: Devs to become vigilant with what goes into this folder?
  
### DECISIONS:

* Do the above change in iterations as below:
  
  1. Introduce `common` folder to be the place where all the functional functions and their tests are to reside (Option 1)
     * Place `valueFormatters` and `openBlob` in this folder at the moment.
     * Refactor the code at places where these functions are currently being used to use the new common functions
     * Refactor the `getExpiredDate` to become a common component

  2. Restructure `sme-web` folder structure to have a new folder called `modules` without integration related files (Option 2)
  3. Move integration related files into each of these modules so that all feature work is contained to one area. (Option 3)

* Steps 2 and 3 will be created as separate cards, to be placed in the backlog and picked up when the crew has the capacity to take on such big refactoring work.
