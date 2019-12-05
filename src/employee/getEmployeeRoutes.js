import EmployeeDetailModule from './employeeDetail/EmployeeDetailModule';
import EmployeeListModule from './employeeList/EmployeeListModule';

const getEmployeeRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'employeeList',
      path: '/',
      module: new EmployeeListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Employees',
    },
    {
      name: 'employeeDetail',
      path: '/:employeeId',
      allowedParams: ['mainTab', 'subTab'],
      module: new EmployeeDetailModule({
        integration, setRootView, popMessages, pushMessage, replaceURLParams,
      }),
      documentTitle: 'Employee',
    },
  ];

  return routes;
};

export default getEmployeeRoutes;
