import BillListModule from './billList/BillListModule';
import BillModule from './billDetail/BillModule';

export const BILL_LIST_ROUTE = 'billList';

const getBillRoutes = ({
  integration, setRootView, pushMessage, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: BILL_LIST_ROUTE,
      path: '/',
      module: new BillListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Bills',
    },
    {
      name: 'billDetail',
      path: '/:billId',
      module: new BillModule({
        integration, setRootView, pushMessage, replaceURLParams, popMessages,
      }),
      documentTitle: 'Bill',
    },
  ];

  return routes;
};

export default getBillRoutes;
