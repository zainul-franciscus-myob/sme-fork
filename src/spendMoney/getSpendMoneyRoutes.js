import SpendMoneyDetailModule from './spendMoneyDetail/SpendMoneyDetailModule';
import SpendMoneyListModule from './spendMoneyList/SpendMoneyListModule';

const getSpendMoneyRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: 'spendMoneyList',
      path: '/',
      module: new SpendMoneyListModule({ integration, setRootView, popMessages }),
    }, {
      name: 'spendMoneyDetail',
      path: '/:spendMoneyId',
      module: new SpendMoneyDetailModule({ integration, setRootView, pushMessage }),
    },
  ];

  return routes;
};

export default getSpendMoneyRoutes;
