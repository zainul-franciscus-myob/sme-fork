import ElectronicPaymentsCreateModule from './electronicPaymentsCreate/ElectronicPaymentsCreateModule';
import ElectronicPaymentsReadModule from './electronicPaymentsRead/ElectronicPaymentsReadModule';

const getElectronicPaymentsRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'electronicPaymentsCreate',
      path: '/',
      module: new ElectronicPaymentsCreateModule({
        integration,
        setRootView,
      }),
      documentTitle: 'Bank file payment',
    },
    {
      name: 'electronicPaymentsRead',
      path: '/:electronicPaymentId',
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
