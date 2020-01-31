# Building Pages

A page is shown for every route, e.g. [`/:region/:businessId/bankingRule/:bankingRuleId`](../../src/modules/bankingRules/getBankingRuleRoutes.js). A page renders a single main module, e.g. [`BankingRuleDetailModule`](../../src/modules/bankingRules/bankingRuleDetail/BankingRuleDetailModule.js).

// @TODO wiring of the module to the route

A module responds to actions made by the user in the view. This could mean fetching the necessary data and/or triggering the necessary state changes. Changes in state are reflected in the view, and the cycle repeats.

// @TODO reactive flow

## What is inside a Module? 

Modules are classes that take on the following shape.

```ts
// Module

class BankingRuleDetailModule {
  constructor({
    setRootView,
    integration,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(bankingRuleDetailReducer);
    this.dispatcher = createBankingRuleDetailDispatcher(this.store);
    this.integrator = createBankingRuleDetailIntegrator(this.store, integration);
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <BankingRuleDetailView />
      </Provider>
    );

    this.setRootView(view);
  }

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render()
  }

  resetState = () => {
    this.dispatcher.resetState();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }
}
```

### Lifecycle

When a user visits a specific route associated with the module, the application `run`s that module. 
When a user changes the route, the application cleans up the module by running `resetState` and `unsubscribeFromStore`.

### Rendering the View

Modules are given a `setRootView` function through the constructor. Given a view, this function will mount it in the DOM.

Every module is accompanied by a *root* view, which is a React component that declares the components to be shown on the page, e.g. [`BankingRuleDetailView`](../../src/modules/bankingRules/bankingRuleDetail/BankingRuleDetailModule.js).


When a module is `run`, the `render` method is called, mounting the *root* view in the DOM.

### Managing State

We have adopted a [`redux`-like](https://redux.js.org/) approach to state management. 

Every module has a single `Store`, which manages the entire state of the module as an object/map. The state is changed in response to actions/events that are `dispatch`ed/sent to the `Store`. 

An action consists of an `intent` and any additional data needed to perform that action. e.g. [`BankingRuleDetailIntents`](../../src/modules/bankingRules/bankingRuleDetail/BankingRuleDetailIntents.js)

```js
// Intents

SHOW_ALERT = Symbol('SHOW_ALERT')
```

```js
const action = {
  intent: SHOW_ALERT,
  message: "🐸",
}
```

Given the current state and an action, a reducer function returns the next state. e.g. [`BankingRuleDetailReducer`](../../src/modules/bankingRules/bankingRuleDetail/reducers/index.js). 

```js
// Reducer

const showAlert = (state, action) => ({
  ...state,
  isAlertShown: true,
  message: action.message
})
```

The reducer also defines the default state through the `getDefaultState` function. It serves the purpose of documenting the state of the module as well as setting the initial state and/or allowing us to reset the state where necessary (e.g. reset an input to default).

```js
// Reducer

const getDefaultState = () => ({
  isAlertShow: false,
})
```

We can inspect or calculate values from the current state using selectors, e.g. [`BankingRuleDetailSelectors`](../../src/modules/bankingRules/bankingRuleDetail/bankingRuleDetailSelectors.js).

```js
// Selectors

const getIsAlertShow = state => state.isAlertShown;
const getMessage = state => `DANGER ☢️: ${message}`;
```

Actions are `dispatch`ed to the store through a `Dispatcher` helper that abstracts the boilerplate. e.g. [BankingRuleDetailDispatcher](../../src/modules/bankingRules/bankingRuleDetail/createBankingRuleDetailDispatcher.js).

```js
// Dispatcher

const createBankingRuleDispatcher = store => ({
  showAlert: (message) => {
    store.dispatch({
      intent: SHOW_ALERT,
      message,
    });
  }
});
```

State is primarily used in the view to determine what is rendered. It is also used to assemble the data to make requests to `Integration` and/or control flow in the module.

### `connect`ing View and State

The state powers what is shown in the view. We use `connect`(https://react-redux.js.org/api/connect) to subscribe the view to changes in our state, which in turn triggers updates to components in our view.

```js
// View

const View = ({ 
  // ...
  isAlertShown, 
  message 
}) => (
  // ...
  isAlertShown && <Alert>{message}</Alert> 
)

const mapStateToProps = state => ({
  isAlertShown: getIsAlertShown(state),
  message: getMessage(state),
})

export default connect(mapStateToProps)(AlertView)
```

### Communicating with the BFF

Modules are given an `Integration` instance, which abstracts away how we communicate with the BFF, e.g [in memory](../../src/integration/createMemoryIntegration.js) or [HTTP](../../src/integration/createHttpIntegration.js).

We can `read` (`GET`) and `write` (`POST`, `PUT`, `DELETE`) to the `Integration` by intent. These requests are sent through an `Integrator` helper that abstracts the boilerplate. e.g. [BankingRuleDetailIntegrator](../../src/modules/bankingRules/bankingRuleDetail/createBankingRuleDetailIntegrator.js). The `Integrator` is given a reference to the store, allowing it to get data to send to the BFF.

```js
const createBankingRuleDetailIntegrator = (store, integration) => ({
  createBankingRule: (onSuccess, onFailure) => {
    const state = store.getState();

    const intent = CREATE_BANKING_RULE;
    const urlParams = getCreateBankingRuleUrlParams(state);
    const content = getCreateBankingRuleContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
})
```

These intents are mapped for the specific `Integration` implementation:

* For HTTP, e.g. [`HttpBankingRuleDetailMapping`](../../src/modules/bankingRules/bankingRuleDetail/mappings/HttpBankingRuleDetailMapping.js)
    ```js
    const HttpBankingRuleDetailMapping = {
      [CREATE_BANKING_RULE]: {
        method: 'POST',
        getPath: ({ businessId }) => `/${businessId}/bankingRule/create_banking_rule`
      }
    }
    ```
    * The arguments to the `getPath` field come from the `urlParams` provided to the `read` or `write` method
* For Memory, e.g [`MemoryBankingRuleDetailMapping`](../../src/modules/bankingRules/bankingRuleDetail/mappings/HttpBankingRuleDetailMapping.js)
    ```js
    const MemoryBankingRuleDetailMapping = {
      [CREATE_BANKING_RULE]: ({ onSuccess }) => onSuccess({
        message: "yay! 🎉"
      })
    }
    ```

### Make the View interactive

The user can do things on the page, e.g. clicks a button, type into an input. These trigger events that bubble up to the module and are handled by `dispatch`ing an action to the store and/or making a call to the BFF

```js
// View

const View = ({ 
  // ...
  onSave,
}) => (
  // ...
  <Button onClick={onSave}>Save</Button>
)
```

```js
// Module

class BankingRuleDetailModule {
  // ...

  save = () => {
    onSuccess = () => {
      this.dispatcher.showAlert("Successfully saved 🐧")
    }
    
    onFailure = ({ message }) => { // error message from BFF
      this.dispatcher.showAlert(message)
    }
  
    this.integrator.save({ onSuccess, onFailure })
  }

  render = () => {
    this.setRootView(
      <Provider store={this.store}>
        <BankingRuleDetailView
          onSave={this.save}
        >
      </Provider>
    )
  }
}
```
