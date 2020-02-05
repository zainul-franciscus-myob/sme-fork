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
