import BillListModule from './billList/BillListModule';
import BillModule from './billDetail/BillModule';
import RouteName from '../router/RouteName';

// @TODO check for these referenced constants
export const BILL_LIST_ROUTE = 'billList';

const getBillRoutes = ({
  integration, setRootView, pushMessage, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.BILL_LIST,
      path: '/:region/:businessId/bill/',
      module: new BillListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Bills',
    },
    {
      name: RouteName.BILL_DETAIL,
      path: '/:region/:businessId/bill/:billId',
      module: new BillModule({
        integration, setRootView, pushMessage, replaceURLParams, popMessages,
      }),
      documentTitle: 'Bill',
    },
  ];

  return routes;
};

export default getBillRoutes;
