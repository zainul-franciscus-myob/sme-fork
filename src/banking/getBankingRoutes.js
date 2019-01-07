import BankingModule from './BankingModule';

const getBankingRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: 'banking',
      path: '/',
      module: new BankingModule({ setRootView, integration }),
    },
  ];

  return routes;
};

export default getBankingRoutes;
