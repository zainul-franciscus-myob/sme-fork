### SOLUTION OPTIONS FOR DIFFERENTIAL ROUTING BASED ON REGION FOR MODULES
----

See [Previous decisions about region rendering](region-rendering.md).

An issue was encounted wile trying to implement region specific modules. If we specify a route without a region parameter (eg `http://<base_url>/au/:businessId/payroll`) the web application will loose context of the region. We have  created 3 options to work around these issues.

**Implementation options**
1. Different route
  * A different subroute is used for each region 
  * **Eg**
    * AU page -> `http://<base_url>/:region/:businessId/payroll`
      * In this case region is always 'AU'
    * NZ page -> `http://<base_url>/:region/:businessId/payroll-nz`
      * In this case region is always 'NZ'
  * **Pros**:
    * Simple to implement
  * **Cons**:
    * Duplication of a "region" concept in routes

2. Use router-5 [constrained-parameters](https://router5.js.org/guides/path-syntax#constrained-parameters)
  * Constrained parameters can be used to force the module routes to only be availiable for a certain region.
  * This will cause the router-5 buildPath method to throw an error which we would have swallow
  * **Route config Eg**
    * AU page
      * `http://<base_url>/:region<au>/:businessId/payroll`
    * NZ page
      * `http://<base_url>/:region<nz>/:businessId/payroll`
  * **Pros**:
    * We keep similar routes for the same context without duplicating the region
  * **Cons**:
    * Duplication of a "region" concept in routes
    * We swallow all errors while building urls
    * We are using a feature of router-5 not for it's purpose (fighting with router-5)

3. Use router-5 [default-parameters](https://router5.js.org/guides/defining-routes#with-plain-objects) -- Go forward siolution 
  * The region can be hardcoded in the path variable.
  * The region will then need to be specified in the default parameter variable 
  * **Route config Eg**
    * AU page
      * ```js 
        {
          path: "http://<base_url>/au/:businessId/payroll",
          defaultParams: { region: 'au' },
        }
        ```
    * NZ page
      * ```js 
        {
          path: "http://<base_url>/nz/:businessId/payroll",
          defaultParams: { region: 'nz' },
        }
        ```
  * **Pros**:
    * We keep similar routes for the same context without duplicating the region
    * Working with router-5 rather than against it
  * **Cons**:
    * Could cause issues if a module is created without specifying region in either the path or defaultParams
      * It should be noted that currently we get these issues if we don't specifiy a region param in the path (so this just opens a 2nd option)

-----

### CONCLUSION
* Option 3 has been agreed to be the best way forward
