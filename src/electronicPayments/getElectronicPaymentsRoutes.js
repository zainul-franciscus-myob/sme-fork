import ElectronicPaymentsModule from './ElectronicPaymentsModule';

const getElectronicPaymentsRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'electronicPayments',
      path: '/',
      module: new ElectronicPaymentsModule({
        integration,
        setRootView,
      }),
    },
  ];
  return routes;
};

export default getElectronicPaymentsRoutes;
