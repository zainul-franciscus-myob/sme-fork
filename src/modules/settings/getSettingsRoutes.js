import RouteName from '../../router/RouteName';
import SubscriptionModule from './subscription/SubscriptionModule';

export default ({
  setRootView,
}) => {
  const routes = [
    {
      name: RouteName.SUBSCRIPTION_SETTINGS,
      path: '/:region/:businessId/settings/subscription',
      module: new SubscriptionModule({ setRootView }),
      documentTitle: 'Settings',
    },
  ];

  return routes;
};