import EmployeeDetailModule from './employeeDetail/EmployeeDetailModule';
import EmployeeListModule from './employeeList/EmployeeListModule';
import RouteName from '../../router/RouteName';

const getEmployeeRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams, globalCallbacks,
}) => [
  {
    name: RouteName.EMPLOYEE_LIST,
    path: '/:region/:businessId/employee/',
    module: new EmployeeListModule({
      integration, setRootView, popMessages,
    }),
    documentTitle: 'Employees',
  },
  {
    name: RouteName.EMPLOYEE_DETAIL,
    path: '/:region/:businessId/employee/:employeeId',
    allowedParams: ['mainTab', 'subTab'],
    module: new EmployeeDetailModule({
      integration, setRootView, popMessages, pushMessage, replaceURLParams, globalCallbacks,
    }),
    documentTitle: 'Employee',
  },
];

export default getEmployeeRoutes;
