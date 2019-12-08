import EmployeePayDetailModule from './employeePayDetail/EmployeePayDetailModule';

const getEmployeePayRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'employeePayDetail',
      path: '/:transactionId',
      documentTitle: 'Employee Pay',
      module: new EmployeePayDetailModule({
        integration, setRootView,
      }),
    },
  ];

  return routes;
};

export default getEmployeePayRoutes;
