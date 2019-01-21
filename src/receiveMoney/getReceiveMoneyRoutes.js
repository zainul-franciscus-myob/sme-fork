import ReceiveMoneyDetailModule from './receiveMoneyDetail/ReceiveMoneyDetailModule';


const getReceiveMoneyRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'receiveMoneyDetail',
      path: '/:receiveMoneyId',
      module: new ReceiveMoneyDetailModule({ integration, setRootView, pushMessage }),
    },
  ];

  return routes;
};

export default getReceiveMoneyRoutes;
