import AccountDetailModule from './accountDetail/AccountDetailModule';
import AccountListModule from './accountList/AccountListModule';
import RouteName from '../../router/RouteName';

const getAccountRoutes = ({
  integration,
  setRootView,
  popMessages,
  pushMessage,
  navigateTo,
}) => {
  const routes = [
    {
      name: RouteName.ACCOUNT_LIST,
      path: '/:region/:businessId/account/',
      module: new AccountListModule({
        integration,
        setRootView,
        popMessages,
        navigateTo,
      }),
      documentTitle: 'Accounts',
    },
    {
      name: RouteName.ACCOUNT_DETAIL,
      path: '/:region/:businessId/account/:accountId',
      module: new AccountDetailModule({
        integration,
        setRootView,
        pushMessage,
      }),
      documentTitle: 'Account',
    },
  ];

  return routes;
};

export default getAccountRoutes;
