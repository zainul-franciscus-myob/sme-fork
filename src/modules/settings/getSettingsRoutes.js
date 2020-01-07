import RouteName from '../../router/RouteName';
import SubscriptionModule from './subscription/SubscriptionModule';

export default ({
  integration,
}) => {
  const routes = [
    {
      name: RouteName.SUBSCRIPTION_SETTINGS,
      path: '/:region/:businessId/settings/subscription',
      module: new SubscriptionModule({ integration }),
      documentTitle: 'Settings',
    },
  ];

  return routes;
};
