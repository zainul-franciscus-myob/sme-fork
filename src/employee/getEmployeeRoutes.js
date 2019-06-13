import EmployeeDetailModule from './employeeDetail/EmployeeDetailModule';
import EmployeeListModule from './employeeList/EmployeeListModule';

const getEmployeeRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams, setupHotKeys,
}) => {
  const routes = [
    {
      name: 'employeeList',
      path: '/',
      module: new EmployeeListModule({
        integration, setRootView, popMessages,
      }),
    },
    {
      name: 'employeeDetail',
      path: '/:employeeId',
      allowedParams: ['mainTab', 'subTab'],
      module: new EmployeeDetailModule({
        integration, setRootView, popMessages, pushMessage, replaceURLParams, setupHotKeys,
      }),
    },
  ];

  return routes;
};

export default getEmployeeRoutes;
