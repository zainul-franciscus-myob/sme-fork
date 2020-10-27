# Using URL Parameters

URL parameters includes any information parsed out of the URL:

* Path parameters `/:region/:businessId/bankingRule/:bankingRuleId`
* Query parameters `/?activeTab=super`

They are often used to pass information between modules in order to render different workflows and allow us to build requests for the BFF.

## Define URL parameters

URL parameters are declared when a module is associated with a route, e.g [getBankingRuleRoutes](../../../src/modules/bankingRules/getBankingRuleRoutes.js).

```js
// Routes

const getBankingRuleRoutes = () => [
  {
    name: RouteName.BANKING_RULE_DETAIL,
    path: '/:region/:businessId/bankingRule/:bankingRuleId',
    allowedParams: ['isDuplicate']
    loadModule: () => import('./BankingRuleDetailModule'),
    documentTitle: 'Banking rule',
  },

  // ...
]
```

Path parameters are declared in the `path` using the `:` syntax defined by [`Router5`](https://router5.js.org/guides/path-syntax).

Query parameters are declared as a list in `allowedParams`. Some query params are always allowed, like `appcue`, which is needed for triggering Appcue journeys.

## Building paths to other routes

When creating buttons or links to other routes, it's best to construct the path based on the canonical route names and parameters, rather than manually constructing it.

Some of the router functions are exposed to modules via the container. In general the `region` and `businessId` can be deduced by the router, and don't need to be provided explicitly.

```js
import RouteNames from "RouteName";

const MyView = ({ constructPath }) => (
  <>
    <a href={`/#${constructPath(RouteNames.PAY_SUPER_READ, { businessEventId: 'abc' })}`}>
      Pay Super
    </a>
  <>
)

```

## Store URL parameters

URL parameters are provided to a module's `run` method as the `context`. At this time, we dispatch an action to our store with the `SET_INITIAL_STATE` intent to save this `context` into state for later use.

```js
class BankingRuleDetailModule {

  // ...

  run = (context) => {
    this.dispatcher.setInitialState(context)
    // ...
  }
}
```

```js
// Dispatcher

const createBankingRuleDetailDispatcher = store => (
  // ...

  setInitialState = (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    })
  }
)
```

```js
// Reducer

const setInitialState = (state, { context }) => ({
  ...state,
  businessId: context.businessId,
  region: context.region,
  bankingRuleId: context.bankingRuleId,
  isDuplicate: context.isDuplicate
})
```

## Retrieve URL parameters

Now that the parameters are in state, we can define selectors to make use of them.

* e.g. if it is a create page, as opposed to a read/update page, the `id` is often set to `new`.

    ```js
    // Selectors

    const getIsCreating = state => state.bankingRuleId === "new"
    ```

    ```js
    // Module

    class BankingRuleModule {
      // ...

      saveBankingRule = () => {
        const state = this.store.getState();

        const isCreating = getIsCreating(state);

        if (isCreating) {
          this.integrator.createBankingRule({ onSuccess, onFailure })
        } else {
          this.integrator.updateBankingRule({ onSuccess, onFailure })
        }
      }
    }
    ```
