import BillPaymentDetailModule from './billPaymentDetail/BillPaymentDetailModule';
import RouteName from '../../router/RouteName';

const getBillPaymentRoutes = ({
  setRootView,
  integration,
  pushMessage,
  replaceURLParams,
  navigateTo,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.BILL_PAYMENT_DETAIL,
      path: '/:region/:businessId/billPayment/:billPaymentId',
      module: new BillPaymentDetailModule({
        setRootView,
        integration,
        pushMessage,
        replaceURLParams,
        navigateTo,
        featureToggles,
      }),
      documentTitle: 'Payment to supplier',
    },
  ];

  return routes;
};

export default getBillPaymentRoutes;
