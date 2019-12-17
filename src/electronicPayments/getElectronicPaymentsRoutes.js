import ElectronicPaymentsCreateModule from './electronicPaymentsCreate/ElectronicPaymentsCreateModule';
import ElectronicPaymentsReadModule from './electronicPaymentsRead/ElectronicPaymentsReadModule';
import RouteName from '../router/RouteName';

const getElectronicPaymentsRoutes = ({
  integration, setRootView, pushMessage, replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.ELECTRONIC_PAYMENTS_CREATE,
      path: '/:region/:businessId/electronicPayments/',
      allowedParams: ['paymentType'],
      module: new ElectronicPaymentsCreateModule({
        integration,
        setRootView,
        replaceURLParams,
      }),
      documentTitle: 'Bank file payment',
    },
    {
      name: RouteName.ELECTRONIC_PAYMENTS_READ,
      path: '/:region/:businessId/electronicPayments/:electronicPaymentId',
      module: new ElectronicPaymentsReadModule({
        integration,
        setRootView,
        pushMessage,
      }),
      documentTitle: 'Bank file payment',
    },
  ];
  return routes;
};

export default getElectronicPaymentsRoutes;
