import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getEmployeeRoutes = () => [
  {
    name: RouteName.EMPLOYEE_LIST,
    path: '/au/:businessId/employee/',
    defaultParams: { region: 'au' },
    loadModule: () => import('./employeeList/EmployeeListModule'),
    documentTitle: 'Employees',
  },
  {
    name: RouteName.EMPLOYEE_DETAIL,
    path: '/au/:businessId/employee/:employeeId',
    defaultParams: { region: 'au' },
    allowedParams: ['mainTab', 'subTab'],
    loadModule: () => import('./employeeDetail/EmployeeDetailModule'),
    documentTitle: 'Employee',
  },
  {
    name: RouteName.ONBOARDING_LEARN_EMPLOYEE,
    path: '/:region/:businessId/learn/employee',
    loadModule: () => import('../learning/employeeLearn/LearnEmployeeModule'),
    documentTitle: 'Create your first employee',
  },
];

export default getEmployeeRoutes;
