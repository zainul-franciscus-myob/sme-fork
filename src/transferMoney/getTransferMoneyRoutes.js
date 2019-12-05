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
      documentTitle: 'Transfer money',
    },
  ];

  return routes;
};

export default getTransferMoneyRoutes;
