import BillListModule from './billList/BillListModule';
import BillModule from './billDetail/BillModule';
import RouteName from '../../router/RouteName';

const getBillRoutes = ({
  integration,
  setRootView,
  pushMessage,
  popMessages,
  replaceURLParams,
  globalCallbacks,
  reload,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.BILL_LIST,
      path: '/:region/:businessId/bill/',
      allowedParams: ['dateFrom', 'dateTo', 'keywords', 'supplierId', 'status', 'orderBy', 'sortOrder'],
      module: new BillListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Bills',
    },
    {
      name: RouteName.BILL_DETAIL,
      path: '/:region/:businessId/bill/:billId',
      module: new BillModule({
        integration,
        setRootView,
        pushMessage,
        replaceURLParams,
        popMessages,
        globalCallbacks,
        reload,
        featureToggles,
      }),
      documentTitle: 'Bill',
    },
  ];

  return routes;
};

export default getBillRoutes;
