import RouteName from '../../router/RouteName';
import TransferMoneyDetailModule from './transferMoneyDetail/TransferMoneyDetailModule';

const getTransferMoneyRoutes = ({
  integration,
  setRootView,
  pushMessage,
  popMessages,
  navigateTo,
}) => {
  const routes = [
    {
      name: RouteName.TRANSFER_MONEY_DETAIL,
      path: '/:region/:businessId/transferMoney/:transferMoneyId',
      module: new TransferMoneyDetailModule({
        integration,
        setRootView,
        pushMessage,
        popMessages,
        navigateTo,
      }),
      documentTitle: 'Transfer money',
    },
  ];

  return routes;
};

export default getTransferMoneyRoutes;
