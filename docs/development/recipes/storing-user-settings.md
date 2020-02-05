# Storing User Settings

Typically list pages will store a users filters between browser sessions. We achieve this using [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), see [`localStorageDriver`](../../../sme-web/src/store/localStorageDriver.js). 

```js
// Module

run = (context) => {
  const settings = loadSettings(context.businessId, RouteName.QUOTE_LIST);
  this.setInitialState(context, settings);

  this.store.subscribe(state => saveSettings(context.businessId, RouteName.QUOTE_LIST, getSettings(state)));
  // ...
}
```

```js
// Selectors

getSettings = state => createSelector(
  getAppliedFilterOptions,
  getSortOrder,
  getOrderBy,
  getSettingsVersion,
  (filterOptions, sortOrder, orderBy, settingsVersion) => ({
    filterOptions,
    sortOrder,
    orderBy,
    settingsVersion,
  }),
);
```

```js
// Reducer

const defaultFilterOptions = {
  customerId: undefined,
  dateFrom: formatIsoDate(getDefaultDateRange()),
  dateTo: formatIsoDate(new Date()),
  keywords: '',
};

const defaultSortOptions = () => {
  sortOrder: 'desc',
  orderBy: 'DateOccurred',
}

const getDefaultState = () => ({
  //...
  filterOptions: defaultFilterOptions,
  appliedFilterOptions: defaultFilterOptions,
  ...defaultSortOptions,
})

const setInitialState = (state, {
  context,
  settings
}) => {
  const isExpiredSettings = state.settingsVersion !== settings.settingsVersion;

  if (isExpiredSettings) {
    return {
      ...state,
      ...context,
    }
  }

  return {
    ...state,
    ...context,
    filterOptions: settings.filterOptions || defaultFilterOptions,
    filterOptions: settings.filterOptions || defaultFilterOptions,
    sortOrder: settings.sortOrder || defaultSortOptions.sortOrder,
    orderBy: settings.orderBy || defaultSortOptions.orderBy,
  }
}
```

When setting the initial state, we check whether the `settingsVersion` in `localStorage` is different to the current version defined in `getDefaultState`.
    * If they are the same, we proceed to load the settings
    * Otherwise, we use the `getDefaultState` settings
