# Abstract Navigation

## Current State (f2d46f648a2216a81fcb4257279ac2f0a69224e0)

We have a `Router` that uses `router5` under the hood. 

* `Router` manages a enum of routes defined in `RouteName`. 
    * Each `RouteName` is associated to a module and a path template (e.g. `/:region/:businessId/billList?status&dateTo&dateFrom`) that is consumed by `router5` when providing the `context` to modules. (see `src/router/convertRoutesToRouterConfig.js`)
* `Router` exposes the ability to `reload`, `replaceUrlParams`(`andReload`) 

Modules receive the context - being the path and query parameters extracted by `router5`. It uses this context later to manually construct URLs when redirecting. Redirects are performed by mutating the global `window.location.href`.

## Problem

* 🔴 [Testing] Flaky module tests due to `window.location.href` being shared across tests
    * Tests are run in parallel, so if a tests modifies it, following tests will fail
* 🟡 [DX] No fixed way to navigate away and a lot of choice provided by the `Router` can make it confusing to know which tool to use when 
* 🟡 [DX] Manual construction of URLs makes changing the routes difficult in the future (e.g. moving from `/transitionList` to `/transactionList2` would be awkward as we would need to do a search and replace instead of using the `RouteName` and the `Router`)

## Solution

![abstract navigation levels](images/abstract-navigation-levels.jpg)

### Level 1

Expose a `navigateTo` method that abstracts the call to `window.location.href`. Remove the use of `window.location` from the modules.

This function will then be injected into the module on creation, much like the other `Router` methods.

```js
// Router.js

navigateTo = (url) => {
  const isCurrentRoute = window.location.href.includes(url);

  if (isCurrentRoute) {
    this.reload();
  }

  window.location.href = url;
}
```

#### Pros

* Solves 🔴 problem
* Minimal implementation required across modules and parallelize
* Safe refactor - essentially extracting into function

#### Cons

* Still a low level abstraction - dealing with raw URLs

### Level 2

Building on `Level 1` - we can remove `replaceUrlParamsAndReload` and `reload`. The functionality of both can be achieved with the new `navigateTo`.

#### Pros

* Solves 🔴 problem
* Greater effort to remove existing usages of these
    - 8 instances of `reload`
    - 1 instance of `replaceUrlParamsAndReload` (Navigation Module - not that 🌶 and easy to test)
* Relatively low risk
* One way to do redirection/reloading - all the same thing

#### Cons

* Still a low level abstraction - dealing with raw URLs

### Level 3

Less stringly typed API by leveraging `RouteName` and `router5` to construct URLs for us.

```js
// Router.js

navigateTo = ({ routeName, params, queryParams }) => {
  const currentRoute = this.router.getState();
  const isCurrentRoute = currentRoute.name === routeName;

  if (isCurrentRoute) {
    this.reload();
  }

  this.router.navigate(routeName, { ...params, ...queryParams });
}
```

#### Pros

* Solves all problems
* More egonomic API that abstracts away manual URL building
    * No need to manually construct a query param string 🙏
    * Reduce duplicated url building logic that lives in module

#### Cons

* Impacts
    * `onPageTransition` + unsaved changes behavior which gives the Module a plain URL to do redirects 
    * External URLs
* Modules need to be updated to use new API
    * Replace URL building logic with `RouteName` building logic
    * Update usages
    * Difficult to parallize is we are doing a hard switch (instead we should support both APIs while we invest the time to improve this - we have done this before with module wide changes - doesn't take that long once carded into small pieces)

## Resolution

[2020-04-16] Starting with `Level 2` - SWAG is on board.
