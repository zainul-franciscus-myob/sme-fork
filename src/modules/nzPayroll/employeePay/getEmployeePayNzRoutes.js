import EmployeePayDetailModule from './employeePayDetail/EmployeePayDetailModule';
import RouteName from '../../../router/RouteName';

const getEmployeePayNzRoutes = ({
  integration,
  setRootView,
  pushMessage,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.EMPLOYEE_PAY_DETAIL_NZ,
      path: '/nz/:businessId/employeePay/:transactionId',
      defaultParams: { region: 'nz' },
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

export default getEmployeePayNzRoutes;
