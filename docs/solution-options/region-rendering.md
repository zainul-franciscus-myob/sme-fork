### SOLUTION OPTIONS FOR RENDERING DIFFERENT VIEWS FOR DIFFERENT REGIONS/CONFIGS

----

**1. At what level should we differentiate the differences on the view or screen logic?**

  - **Text differences** ==> json mapping of text to values (e.g. `getRegionToDialectText.js`)
    * e.g. Table header labels, input field labels
  - **Visual differences that are more than just label differences** => Implement different **Views** for different regions
    * e.g. Show/hide a checkbox, Show/hide input fields
  - **More behavioural differences** ==> Implement different **modules** for different regions
    * e.g. Different workflows for a button, different logic triggered from onChange

-----

**2. IMPLEMENTATION OPTIONS:**

* **`getRegionToDialectText`** - already exists in `sme-web`

* **VIEW - switch/ternary inside module to decide what view to render for a config**
  - Cost: LOW
  - Risk: LOW
  - Pros: 
  	 - Simple to implement
  - Cons: 
  	 - This option makes it easy to pass different handlers to different views, which should indicate the need for different modules instead of different handling within the module. 

* **VIEW - config mapping outside of module**
  - Cost: LOW
  - Risk: LOW
  - Pros: 
  	 - Simple to implement, config map outside of Module. 
  	 - Deterministic mapping from params to View components
  - Cons: 
  	 - Easy to pass different handlers to different views, which should indicate the need for different modules instead of different handling within the module. 

* **MODULE - Have a base module which uses a config mapping to decide what sub-module to render based on what region/config it is**

  - Cost: LOW-MEDIUM
    * Existing pattern with Bill, Invoices, Quotes
    * Just need to create a config mapping to tell the base module which sub module to instantiate.
  - Risk: LOW
    - Won't affect other existing route to module mapping
  - Pros: 
    - Simple to implement
    - Won't affect existing architecture, besides the pages that require different rendering based on configs
  - Cons:
    - Useless intermediate base module, which is needed as current architecture does not support dynamically determining what module to use upon route change (based on some config from the url params)

* **MODULE - Flatten subroutes && hardcode region into path**
  - Cost: MEDIUM
  - Risk: HIGH
    * Requires testing all routes to make sure the right modules are being loaded.
  - Pros: 
  - Cons:
    * Configuration might be restricted, as the url params are hardcoded to the URL.

* **MODULE - RouteName to module mapping is determined dynamically as route changes**

This implementation requires changing the Router behaviour to determine the module mapping to `routeName` dynamically each time the route changes, instead of statically at the beginning of the app starting.

  - Cost: MEDIUM - HIGH
    * Refactoring all getModuleRoute files & adding additional moduleResolver config files
    * Refactoring unsubscribeAllModulesFromStore
  - Risk: HIGH
    * Requires testing all routes to make sure the right modules are being loaded.
  - Pros:
    * Don't need the intermediate base module
    * Easier to scale for future module branching from different configs
  - Cons: 
  	 * Great effort required in refactoring
  	 * Regression testing to make sure the app still works correctly on each page
     
-----

### CONCLUSION

* For small visual differences, use either `getRegionToDialectText.js` or different `Views`.
* For behavioural differences, use different `Modules`. In terms of implementations for different Modules:
  - Prefer the option of using a base module if only a small number of pages will have different behaviours based on region
  - If the number of these pages is quite large, the preferred option is to change the Router to determine the module mapping dynamically as the route changes.

