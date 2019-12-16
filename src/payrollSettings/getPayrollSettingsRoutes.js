import PayrollSettingsModule from './PayrollSettingsModule';
import RouteName from '../router/RouteName';

const getPayrollSettingsRoutes = ({
  integration, setRootView, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: RouteName.PAYROLL_SETTINGS,
      path: '/:region/:businessId/payrollSettings/',
      allowedParams: ['tab'],
      module: new PayrollSettingsModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
      documentTitle: 'Payroll settings',
    },
  ];

  return routes;
};

export default getPayrollSettingsRoutes;
