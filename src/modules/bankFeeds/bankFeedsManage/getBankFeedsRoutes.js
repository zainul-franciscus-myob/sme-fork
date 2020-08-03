import BankFeedsModule from './BankFeedsModule';
import RouteName from '../../../router/RouteName';

const getBankFeedsRoutes = ({
  integration,
  setRootView,
  globalCallbacks,
  isToggleOn,
}) => {
  const routes = [
    {
      name: RouteName.BANK_FEEDS,
      path: '/:region/:businessId/bankFeeds/',
      module: new BankFeedsModule({
        integration,
        setRootView,
        globalCallbacks,
        isToggleOn,
      }),
      documentTitle: 'Bank feeds',
    },
  ];

  return routes;
};

export default getBankFeedsRoutes;
