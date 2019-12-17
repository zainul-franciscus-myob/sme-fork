import CustomerStatementListModule from './CustomerStatementListModule';
import RouteName from '../../router/RouteName';

export const CUSTOMER_STATEMENT_LIST_ROUTE = 'customerStatementList';

const getCustomerStatementRoutes = ({ integration, setRootView }) => {
  const routes = [
    {
      name: RouteName.CUSTOMER_STATEMENT_LIST,
      path: '/:region/:businessId/customerStatement/',
      module: new CustomerStatementListModule({ integration, setRootView }),
      documentTitle: 'Customer statements',
    },
  ];

  return routes;
};

export default getCustomerStatementRoutes;
