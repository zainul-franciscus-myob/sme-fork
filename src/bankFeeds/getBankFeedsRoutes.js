import BankFeedsModule from './BankFeedsModule';

const getBankFeedsRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'bankFeeds',
      path: '/',
      module: new BankFeedsModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getBankFeedsRoutes;
