import LinkedAccountsModule from './LinkedAccountsModule';
import RouteName from '../../router/RouteName';

const getLinkedAccountsRoutes = ({ integration, setRootView }) => {
  return [
    {
      name: RouteName.LINKED_ACCOUNTS,
      path: '/:region/:businessId/linkedAccounts/',
      module: new LinkedAccountsModule({
        integration,
        setRootView,
      }),
      documentTitle: 'Linked accounts',
    },
  ];
};

export default getLinkedAccountsRoutes;
