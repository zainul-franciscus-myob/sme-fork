import CustomerStatementListModule from './CustomerStatementListModule';
import RouteName from '../../router/RouteName';

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
