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
  globalCallbacks,
  featureToggles,
  isToggleOn,
}) => {
  const routes = [
    {
      name: RouteName.EMPLOYEE_LIST,
      path: '/au/:businessId/employee/',
      defaultParams: { region: 'au' },
      module: new EmployeeListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Employees',
    },
    {
      name: RouteName.EMPLOYEE_DETAIL,
      path: '/au/:businessId/employee/:employeeId',
      defaultParams: { region: 'au' },
      allowedParams: ['mainTab', 'subTab'],
      module: new EmployeeDetailModule({
        integration,
        setRootView,
        popMessages,
        pushMessage,
        replaceURLParams,
        globalCallbacks,
        featureToggles,
        isToggleOn,
      }),
      documentTitle: 'Employee',
    },
    {
      name: RouteName.ONBOARDING_LEARN_EMPLOYEE,
      path: '/:region/:businessId/learn/employee',
      module: new LearnEmployeeModule({
        setRootView,
        integration,
        learnEmployeeCompleted: globalCallbacks.learnEmployeeCompleted,
      }),
      documentTitle: 'Create your first employee',
    },
  ];

  return routes;
};

export default getEmployeeRoutes;
