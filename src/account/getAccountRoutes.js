import AccountDetailModule from './accountDetail/AccountDetailModule';
import AccountListModule from './accountList/AccountListModule';

export const ACCOUNT_LIST_ROUTE = 'accountList';
export const ACCOUNT_DETAIL_ROUTE = 'accountDetail';

const getAccountRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: ACCOUNT_LIST_ROUTE,
      path: '/',
      module: new AccountListModule({ integration, setRootView, popMessages }),
      documentTitle: 'Accounts',
    },
    {
      name: ACCOUNT_DETAIL_ROUTE,
      path: '/:accountId',
      module: new AccountDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Account',
    },
  ];

  return routes;
};

export default getAccountRoutes;
