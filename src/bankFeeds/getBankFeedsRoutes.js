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
      documentTitle: 'Bank feeds',
    },
  ];

  return routes;
};

export default getBankFeedsRoutes;
