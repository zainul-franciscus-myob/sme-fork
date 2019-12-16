import BankFeedsModule from './BankFeedsModule';
import RouteName from '../router/RouteName';

const getBankFeedsRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.BANK_FEEDS,
      path: '/:region/:businessId/bankFeeds/',
      module: new BankFeedsModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Bank feeds',
    },
  ];

  return routes;
};

export default getBankFeedsRoutes;
