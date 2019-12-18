import EmployeePayDetailModule from './employeePayDetail/EmployeePayDetailModule';
import RouteName from '../../router/RouteName';

const getEmployeePayRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.EMPLOYEE_PAY_DETAIL,
      path: '/:region/:businessId/employeePay/:transactionId',
      documentTitle: 'Employee Pay',
      module: new EmployeePayDetailModule({
        integration, setRootView,
      }),
    },
  ];

  return routes;
};

export default getEmployeePayRoutes;
