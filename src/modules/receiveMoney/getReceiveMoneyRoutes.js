import ReceiveMoneyDetailModule from './receiveMoneyDetail/ReceiveMoneyDetailModule';
import RouteName from '../../router/RouteName';

const getReceiveMoneyRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.RECEIVE_MONEY_DETAIL,
      path: '/:region/:businessId/receiveMoney/:receiveMoneyId',
      module: new ReceiveMoneyDetailModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Receive money',
    },
  ];

  return routes;
};

export default getReceiveMoneyRoutes;