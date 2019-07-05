import TransferMoneyDetailModule from './transferMoneyDetail/TransferMoneyDetailModule';

const getTransferMoneyRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'transferMoneyDetail',
      path: '/:transferMoneyId',
      module: new TransferMoneyDetailModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getTransferMoneyRoutes;
