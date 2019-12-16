import BankingModule from './BankingModule';
import RouteName from '../router/RouteName';

const getBankingRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.BANKING_TRANSACTION_LIST,
      path: '/:region/:businessId/banking/',
      module: new BankingModule({
        integration, setRootView,
      }),
      documentTitle: 'Bank feed transactions',
    },
  ];

  return routes;
};

export default getBankingRoutes;
