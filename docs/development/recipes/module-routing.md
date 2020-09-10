# Module Routing

Each route is given a module to `run`.

```js
// RouteName.js

const RouteName = {
  // ...
  BANKING_RULE_DETAIL: 'bankingRule/bankingRuleDetail',
}
```

```js
// getBankingRuleRoutes.js

const getBankingRuleRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    // ...
    {
      name: RouteName.BANKING_RULE_DETAIL,
      path: '/:region/:businessId/bankingRule/:bankingRuleId',
      module: new BankingRuleDetailModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Banking rule',
    },
  ];

  return routes;
};
```

```js
// getRoutes.js

const getRoutes = moduleParams => [
  // ...
  ...getBankingRuleRoutes(moduleParams),
]
```

----
## Module mapping with region specific module
If a region is hardcoded to be only for `au` or `nz` in the `path` variable a region must be specified in the `defaultParams` variable.

```js
// getBankingRuleRoutesAu.js

const getBankingRuleRoutesAu = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    // ...
    {
      name: RouteName.BANKING_RULE_DETAIL,
      path: '/au/:businessId/bankingRule/:bankingRuleId',
      defaultParams: { region: 'au' },
      module: new BankingRuleDetailModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Banking rule - Australia',
    },
  ];

  return routes;
};
```