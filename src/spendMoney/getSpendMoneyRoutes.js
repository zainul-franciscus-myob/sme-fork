import SpendMoneyDetailModule from './spendMoneyDetail/SpendMoneyDetailModule';

const getSpendMoneyRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'spendMoneyDetail',
      path: '/:spendMoneyId',
      module: new SpendMoneyDetailModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Spend money',
    },
  ];

  return routes;
};

export default getSpendMoneyRoutes;
