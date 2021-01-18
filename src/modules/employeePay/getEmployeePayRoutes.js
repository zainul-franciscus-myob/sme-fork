import EmployeePayDetailModule from './employeePayDetail/EmployeePayDetailModule';
import RouteName from '../../router/RouteName';

const getEmployeePayRoutes = ({
  integration,
  setRootView,
  pushMessage,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.EMPLOYEE_PAY_DETAIL,
      path: '/au/:businessId/employeePay/:transactionId',
      defaultParams: { region: 'au' },
      documentTitle: 'Employee Pay',
      module: new EmployeePayDetailModule({
        integration,
        setRootView,
        pushMessage,
        featureToggles,
      }),
    },
  ];

  return routes;
};

export default getEmployeePayRoutes;
