import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getPayrollSettingsRoutes = () => [
  {
    name: RouteName.PAYROLL_SETTINGS,
    path: '/:region/:businessId/payrollSettings/',
    allowedParams: ['tab'],
    loadModule: () => import('./PayrollSettingsModule'),
    documentTitle: 'Payroll settings',
  },
  {
    name: RouteName.ONBOARDING_LEARN_PAYROLL,
    path: '/:region/:businessId/payroll/learn',
    loadModule: () => import('../learning/payrollLearn/LearnPayrollModule'),
    documentTitle: 'Learn payroll',
  },
];

export default getPayrollSettingsRoutes;
