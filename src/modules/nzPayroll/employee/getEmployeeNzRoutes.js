import EmployeeDetailNzModule from './employeeDetail/EmployeeDetailNzModule';
import EmployeeListNzModule from './employeeList/EmployeeListNzModule';
import RouteName from '../../../router/RouteName';

const getEmployeeNzRoutes = ({
  integration,
  setRootView,
  popMessages,
  pushMessage,
  replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.EMPLOYEE_LIST_NZ,
      path: '/nz/:businessId/employee/',
      defaultParams: { region: 'nz' },
      module: new EmployeeListNzModule({
        integration,
        setRootView,
        popMessages,
        pushMessage,
      }),
      documentTitle: 'Employees',
    },
    {
      name: RouteName.EMPLOYEE_DETAIL_NZ,
      path: '/nz/:businessId/employee/:employeeId',
      defaultParams: { region: 'nz' },
      allowedParams: ['mainTab'],
      module: new EmployeeDetailNzModule({
        integration,
        setRootView,
        popMessages,
        pushMessage,
        replaceURLParams,
      }),
      documentTitle: 'Employee',
    },
  ];

  return routes;
};

export default getEmployeeNzRoutes;
