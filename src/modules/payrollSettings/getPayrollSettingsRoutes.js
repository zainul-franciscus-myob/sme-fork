import LearnPayrollModule from '../learning/payrollLearn/LearnPayrollModule';
import PayrollSettingsModule from './PayrollSettingsModule';
import RouteName from '../../router/RouteName';

const getPayrollSettingsRoutes = ({
  integration, setRootView, popMessages, replaceURLParams, globalCallbacks,
}) => [
  {
    name: RouteName.PAYROLL_SETTINGS,
    path: '/:region/:businessId/payrollSettings/',
    allowedParams: ['tab'],
    module: new PayrollSettingsModule({
      integration, setRootView, popMessages, replaceURLParams, globalCallbacks,
    }),
    documentTitle: 'Payroll settings',
  },
  {
    name: RouteName.ONBOARDING_LEARN_PAYROLL,
    path: '/:region/:businessId/payroll/learn',
    module: new LearnPayrollModule({ setRootView, globalCallbacks }),
    documentTitle: 'Learn payroll',
  },
];


export default getPayrollSettingsRoutes;
