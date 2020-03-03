import EmployeeDetailModule from './employeeDetail/EmployeeDetailModule';
import EmployeeListModule from './employeeList/EmployeeListModule';
import LearnEmployeeModule from '../learning/employeeLearn/LearnEmployeeModule';
import RouteName from '../../router/RouteName';

const getEmployeeRoutes = ({
  integration,
  setRootView,
  popMessages,
  pushMessage,
  replaceURLParams,
  globalCallbacks: { addPaymentDetailsAndSaveSuccess, learnEmployeeCompleted },
}) => {
  const routes = [
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
        integration,
        setRootView,
        popMessages,
        pushMessage,
        replaceURLParams,
        addPaymentDetailsAndSaveSuccess,
      }),
      documentTitle: 'Employee',
    },
    {
      name: RouteName.ONBOARDING_LEARN_EMPLOYEE,
      path: '/:region/:businessId/employee/learn',
      module: new LearnEmployeeModule({ setRootView, integration, learnEmployeeCompleted }),
      documentTitle: 'Create your first employee',
    },
  ];

  return routes;
};

export default getEmployeeRoutes;
