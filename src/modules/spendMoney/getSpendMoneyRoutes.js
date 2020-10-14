import RouteName from '../../router/RouteName';
import SpendMoneyDetailModule from './spendMoneyDetail/SpendMoneyDetailModule';

const getSpendMoneyRoutes = ({
  integration,
  setRootView,
  pushMessage,
  popMessages,
  navigateTo,
}) => {
  const routes = [
    {
      name: RouteName.SPEND_MONEY_DETAIL,
      path: '/:region/:businessId/spendMoney/:spendMoneyId',
      module: new SpendMoneyDetailModule({
        integration,
        setRootView,
        pushMessage,
        popMessages,
        navigateTo,
      }),
      documentTitle: 'Spend money',
    },
  ];

  return routes;
};

export default getSpendMoneyRoutes;
