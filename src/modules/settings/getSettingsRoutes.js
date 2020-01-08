import RouteName from '../../router/RouteName';
import SubscriptionModule from './subscription/SubscriptionModule';

export default ({
  integration,
  previousRoute,
}) => {
  const routes = [
    {
      name: RouteName.SUBSCRIPTION_SETTINGS,
      path: '/:region/:businessId/settings/subscription',
      module: new SubscriptionModule({ integration, previousRoute }),
      documentTitle: 'Settings',
    },
  ];

  return routes;
};
