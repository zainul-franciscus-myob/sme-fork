import RouteName from '../../../router/RouteName';

/** @type {import('../../module-types').RouteConfig} */
const getEmployeeNzRoutes = () => [
  {
    name: RouteName.EMPLOYEE_LIST_NZ,
    path: '/nz/:businessId/employee/',
    defaultParams: { region: 'nz' },
    loadModule: () => import('./employeeList/EmployeeListNzModule'),
    documentTitle: 'Employees',
  },
  {
    name: RouteName.EMPLOYEE_DETAIL_NZ,
    path: '/nz/:businessId/employee/:employeeId',
    defaultParams: { region: 'nz' },
    allowedParams: ['mainTab', 'subTab'],
    loadModule: () => import('./employeeDetail/EmployeeDetailNzModule'),
    documentTitle: 'Employee',
  },
];

export default getEmployeeNzRoutes;
