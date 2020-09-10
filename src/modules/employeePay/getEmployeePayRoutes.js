import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getEmployeePayRoutes = () => [
  {
    name: RouteName.EMPLOYEE_PAY_DETAIL,
    path: '/:region/:businessId/employeePay/:transactionId',
    documentTitle: 'Employee Pay',
    loadModule: () => import('./employeePayDetail/EmployeePayDetailModule'),
  },
];

export default getEmployeePayRoutes;
