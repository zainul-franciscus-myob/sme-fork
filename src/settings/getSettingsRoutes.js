import SubscriptionModule from './subscription/SubscriptionModule';

export default ({
  setRootView,
}) => {
  const routes = [
    {
      name: 'subscription',
      path: '/subscription',
      module: new SubscriptionModule({ setRootView }),
    },
  ];

  return routes;
};
