import PayrollSettingsModule from './PayrollSettingsModule';

const getPayrollSettingsRoutes = ({
  integration, setRootView, popMessages, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'payrollSettings',
      path: '/',
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
