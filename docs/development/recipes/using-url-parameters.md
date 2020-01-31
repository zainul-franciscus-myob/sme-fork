# Using URL Parameters

URL parameters includes any information parsed out of the URL:

* Path parameters `/:region/:businessId/bankingRule/:bankingRuleId`
* Query parameters `/?activeTab=super`

They are often used to pass information between modules in order to render different workflows and allow us to build requests for the BFF.

## Define URL parameters

URL parameters are declared when a module is associated with a route, e.g [getBankingRuleRoutes](src/modules/bankingRules/getBankingRuleRoutes.js).

```js
// Routes

const getBankingRuleRoutes = ({ integration, setRootView }) => [ 
  {
    name: RouteName.BANKING_RULE_DETAIL,
    path: '/:region/:businessId/bankingRule/:bankingRuleId',
    allowedParams: ['isDuplicate']
    module: new BankingRuleDetailModule({
      integration, setRootView, pushMessage,
    }),
    documentTitle: 'Banking rule',
  },

  // ...
]
```

Path parameters are declared in the `path` using the `:` syntax defined by [`Router5`](https://router5.js.org/guides/path-syntax).

Query parameters are declared as a list in `allowedParams`.

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
