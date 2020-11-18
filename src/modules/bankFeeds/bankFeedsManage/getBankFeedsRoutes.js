import BankFeedsModule from './BankFeedsModule';
import RouteName from '../../../router/RouteName';

const getBankFeedsRoutes = ({
  integration,
  setRootView,
  globalCallbacks,
  isToggleOn,
  navigateTo,
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
        navigateTo,
      }),
      documentTitle: 'Bank feeds',
    },
  ];

  return routes;
};

export default getBankFeedsRoutes;
