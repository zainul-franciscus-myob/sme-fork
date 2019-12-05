import BillPaymentDetailModule from './billPaymentDetail/BillPaymentDetailModule';

const getBillPaymentRoutes = ({
  setRootView, integration, pushMessage,
}) => {
  const routes = [
    {
      name: 'billPaymentDetail',
      path: '/:billPaymentId',
      module: new BillPaymentDetailModule({ setRootView, integration, pushMessage }),
      documentTitle: 'Bill payment',
    },
  ];

  return routes;
};

export default getBillPaymentRoutes;
