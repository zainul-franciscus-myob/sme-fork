import ReceiveMoneyDetailModule from './receiveMoneyDetail/ReceiveMoneyDetailModule';
import ReceiveMoneyListModule from './receiveMoneyList/ReceiveMoneyListModule';


const getReceiveMoneyRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: 'receiveMoneyList',
      path: '/',
      module: new ReceiveMoneyListModule({ integration, setRootView, popMessages }),
    },
    {
      name: 'receiveMoneyDetail',
      path: '/:receiveMoneyId',
      module: new ReceiveMoneyDetailModule({ integration, setRootView, pushMessage }),
    },
  ];

  return routes;
};

export default getReceiveMoneyRoutes;
