import ReceiveMoneyDetailModule from './receiveMoneyDetail/ReceiveMoneyDetailModule';
import RouteName from '../../router/RouteName';

const getReceiveMoneyRoutes = ({
  integration, setRootView, pushMessage, popMessages, navigateTo, isToggleOn,
}) => {
  const routes = [
    {
      name: RouteName.RECEIVE_MONEY_DETAIL,
      path: '/:region/:businessId/receiveMoney/:receiveMoneyId',
      allowedParams: ['duplicateReceiveMoneyId'],
      module: new ReceiveMoneyDetailModule({
        integration, setRootView, pushMessage, popMessages, navigateTo, isToggleOn,
      }),
      documentTitle: 'Receive money',
    },
  ];

  return routes;
};

export default getReceiveMoneyRoutes;
