import ElectronicPaymentsCreateModule from './electronicPaymentsCreate/ElectronicPaymentsCreateModule';
import ElectronicPaymentsReadModule from './electronicPaymentsRead/ElectronicPaymentsReadModule';

const getElectronicPaymentsRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'electronicPaymentsCreate',
      path: '/',
      module: new ElectronicPaymentsCreateModule({
        integration,
        setRootView,
      }),
    },
    {
      name: 'electronicPaymentsRead',
      path: '/:electronicPaymentId',
      module: new ElectronicPaymentsReadModule({
        integration,
        setRootView,
      }),
    },
  ];
  return routes;
};

export default getElectronicPaymentsRoutes;
