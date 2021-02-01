import RouteName from '../../router/RouteName';
import TaxDetailModule from './taxDetail/TaxDetailModule';
import TaxListModule from './taxList/TaxListModule';

const getTaxRoutes = ({
  integration,
  setRootView,
  navigateTo,
  pushMessage,
  popMessages,
}) => {
  const routes = [
    {
      name: RouteName.TAX_LIST,
      path: '/:region/:businessId/tax/',
      module: new TaxListModule({ integration, setRootView, popMessages }),
      documentTitle: 'Tax codes',
    },
    {
      name: RouteName.TAX_DETAIL,
      path: '/:region/:businessId/tax/:taxCodeId',
      module: new TaxDetailModule({
        integration,
        setRootView,
        navigateTo,
        pushMessage,
      }),
      documentTitle: 'Tax code',
    },
  ];

  return routes;
};

export default getTaxRoutes;
