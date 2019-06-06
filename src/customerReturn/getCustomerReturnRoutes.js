import CustomerReturnListModule from './customerReturnList/CustomerReturnListModule';

const getCustomerReturnRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'customerReturnList',
      path: '/',
      module: new CustomerReturnListModule({
        integration, setRootView,
      }),
    },
  ];

  return routes;
};

export default getCustomerReturnRoutes;
