import EmployeeListModule from './employeeList/EmployeeListModule';

const getEmployeeRoutes = ({
  integration, setRootView, popMessages,
}) => {
  const routes = [
    {
      name: 'employeeList',
      path: '/',
      module: new EmployeeListModule({
        integration, setRootView, popMessages,
      }),
    },
  ];

  return routes;
};

export default getEmployeeRoutes;
