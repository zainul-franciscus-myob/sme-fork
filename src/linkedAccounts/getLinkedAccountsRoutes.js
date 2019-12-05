import LinkedAccountsModule from './LinkedAccountsModule';

const getLinkedAccountsRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'linkedAccounts',
      path: '/',
      module: new LinkedAccountsModule({
        integration, setRootView,
      }),
      documentTitle: 'Linked accounts',
    },
  ];

  return routes;
};

export default getLinkedAccountsRoutes;
