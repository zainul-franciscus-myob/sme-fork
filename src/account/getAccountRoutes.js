import AccountListModule from './accountList/AccountListModule';

const getAccountRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'accountList',
      path: '/',
      module: new AccountListModule({ integration, setRootView }),
    },
  ];

  return routes;
};

export default getAccountRoutes;
