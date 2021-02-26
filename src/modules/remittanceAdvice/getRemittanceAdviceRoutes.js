import RemittanceAdviceListModule from './RemittanceAdviceListModule';
import RouteName from '../../router/RouteName';

const getRemittanceAdviceRoutes = ({ integration, setRootView }) => [
  {
    name: RouteName.REMITTANCE_ADVICE,
    path: '/:region/:businessId/remittanceAdvice/',
    module: new RemittanceAdviceListModule({
      integration,
      setRootView,
    }),
    documentTitle: 'Remittance advice',
  },
];

export default getRemittanceAdviceRoutes;
