
import EmployeeListNzModule from './employeeList/EmployeeListNzModule';
import RouteName from '../../../router/RouteName';

const getEmployeeNzRoutes = ({
  integration,
  setRootView,
  popMessages,
}) => {
  const routes = [
    {
      name: RouteName.EMPLOYEE_LIST_NZ,
      path: '/nz/:businessId/employee/',
      defaultParams: { region: 'nz' },
      module: new EmployeeListNzModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Employees',
    },
  ];

  return routes;
};

export default getEmployeeNzRoutes;
