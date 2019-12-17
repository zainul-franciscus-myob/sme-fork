import RouteName from '../../router/RouteName';
import TransferMoneyDetailModule from './transferMoneyDetail/TransferMoneyDetailModule';

const getTransferMoneyRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.TRANSFER_MONEY_DETAIL,
      path: '/:region/:businessId/transferMoney/:transferMoneyId',
      module: new TransferMoneyDetailModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Transfer money',
    },
  ];

  return routes;
};

export default getTransferMoneyRoutes;
