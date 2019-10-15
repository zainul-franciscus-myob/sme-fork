import AccountListModule from './accountList/AccountListModule';

export const ACCOUNT_LIST_ROUTE = 'accountList';

const getAccountRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: ACCOUNT_LIST_ROUTE,
      path: '/',
      module: new AccountListModule({ integration, setRootView }),
    },
  ];

  return routes;
};

export default getAccountRoutes;
