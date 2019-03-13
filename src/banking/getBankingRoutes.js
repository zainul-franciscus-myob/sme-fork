import BankingModule from './BankingModule';

const getBankingRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'bankTransactionList',
      path: '/',
      module: new BankingModule({
        integration, setRootView,
      }),
    },
  ];

  return routes;
};

export default getBankingRoutes;
