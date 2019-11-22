import CustomerStatementListModule from './CustomerStatementListModule';

export const CUSTOMER_STATEMENT_LIST_ROUTE = 'customerStatementList';

const getCustomerStatementRoutes = ({ integration, setRootView }) => {
  const routes = [
    {
      name: CUSTOMER_STATEMENT_LIST_ROUTE,
      path: '/',
      module: new CustomerStatementListModule({ integration, setRootView }),
    },
  ];

  return routes;
};

export default getCustomerStatementRoutes;
