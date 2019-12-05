import ReceiveMoneyDetailModule from './receiveMoneyDetail/ReceiveMoneyDetailModule';

const getReceiveMoneyRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'receiveMoneyDetail',
      path: '/:receiveMoneyId',
      module: new ReceiveMoneyDetailModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Receive money',
    },
  ];

  return routes;
};

export default getReceiveMoneyRoutes;
