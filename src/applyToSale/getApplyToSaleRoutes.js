import ApplyToSaleModule from './ApplyToSaleModule';
import RouteName from '../router/RouteName';

const getApplyToSaleRoutes = ({
  integration, setRootView, pushMessage,
}) => [
  {
    name: RouteName.APPLY_TO_SALE,
    path: '/:region/:businessId/applyToSale/:applyToSaleId',
    module: new ApplyToSaleModule({
      integration,
      setRootView,
      pushMessage,
    }),
    documentTitle: 'Apply to sale',
  },
];

export default getApplyToSaleRoutes;
