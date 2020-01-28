# General Development Patterns

The patterns defined in this document should be applied where applicable. This aims to standardise the approaches we use to build the UI, and foster a shared understanding of the code for the crew.

See [coding-standards.md](/docs/coding-standards.md) for a more general style guide.

## Patterns

### Integrator/Dispatcher

For a given domain module, define;

* An *integrator* which is a function returning an object of integration functions. The store and integration type is passed into the function. These integration functions implement behaviours calling on the runtime integration type (eg. `http` or `memory`).
* A *dispatcher* which is a function returning an object of intent handler implementations. This takes the store as an argument.

The `integrator` and `dispatcher` functions should be referenced in the domain module.

*Example* Foo domain module includes the integrator and dispatcher. For the sake of brevity, the code has been simplified. See specific module code for more concrete examples.

```javascript
// Declare an intent for the purposes of this example. This should be declared in a separate file.
export const LOAD_FOO = Symbol('Load foo');

// Declare the Integrator, with a function handler to load the example data
const createFooIntegrator = (store, integration) => ({

  loadFoo: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    integration.read({
      intent: LOAD_FOO,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createFooIntegrator;
```

```javascript
// Declare the dispatcher, with a function to set the data loaded from the integrator
const createFooDispatcher = store => ({

  setFoo: (address) => {
    store.dispatch({
      intent: LOAD_FOO,
      address,
    });
  },

});

export default createFooDispatcher;
```

```javascript
// Bring it all together in the module, which loads Foo data when the module is run.
export default class FooModule {
  constructor({
    integration, reload,
  }) {
    this.integration = integration;
    this.reload = reload;
    this.store = new Store();
    this.integrator = createFooIntegrator(this.store, this.integration);
    this.dispatcher = createFooDispatcher(this.store);
  }

  loadFoo = () => {
    const onSuccess = ({ fooData }) => {
      this.dispatcher.setFoo(fooData);
    };
    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.setFoo('');
    };

    this.integrator.loadFoo({
      onSuccess,
      onFailure,
    });
  };

  run(context) {
    this.loadFoo();
  }
}
```

### Passing data between modules

The architecture of the `sme-web` Application calls for a domain to be able to run independently of other domain modules. In the case where data should be passed between modules, using URL parameters can be leveraged. The source module should declare a module function to encode the required data into URL parameter key/value pairs;

```javascript
// This is the source module, where data is intended to be passed from
export default class FooModule {
  constructor({ integration }) {
    this.integration = integration;
    this.store = new Store(invoiceItemReducer);
    this.integrator = createFooIntegrator(this.store, this.integration);
    this.dispatcher = createFooDispatcher(this.store);
  }

  // This function can be reused (copied) to other modules to encode the data into query param string
  getQueryFromParams = (params = {}) => {
    const encode = encodeURIComponent;
    const query = Object.keys(params)
      .map(key => `${encode(key)}=${encode(params[key])}`)
      .join('&');
    return `?${query}`;
  };

  // Create the query string from the store and redirect the browser to the new screen
  openBaz = () => {
    const state = this.store.getState();
    const redirectParams = {
      // see the target module store default state
      dataItem: getDataItem(state),
      anotherDataItem: getAnotherDataItem(state),
    };
    const urlParams = this.getQueryFromParams(redirectParams);
    const businessId = getBusinessId(state);
    const region = getRegion(state);
    window.location.href = `/#/${region}/${businessId}/baz/${urlParams}`;
  }

  run(context) {
    this.render();
  }
}
```

The target module picks up the data from the context. The target state store should include keys that correspond to the data passed into the module, which will be populated from the context;

```javascript
// This is the target module, where data is intended to be passed to
export default class BazModule {
  constructor({ integration }) {
    this.integration = integration;
    this.store = new Store(invoiceItemReducer);
    this.integrator = createBazIntegrator(this.store, this.integration);
    this.dispatcher = createBazDispatcher(this.store);
  }

  run(context) {
    this.setInitialState(context); // context includes url encoded data
    this.render();
  }
}
```
___
`bazReducer.js`
```javascript
const getDefaultState = () => ({
  dataItem: '',
  anotherDataItem: '',
});

const resetState = () => (getDefaultState());

// Set the initial state, including URL encoded data from the context passed in
const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
};

const bazDetailReducer = createReducer(getDefaultState(), handlers);

export default bazDetailReducer;
```

