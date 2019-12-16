import IncomeAllocationModule from './IncomeAllocationModule';
import RouteName from '../router/RouteName';

const getIncomeAllocationRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.INCOME_ALLOCATION,
      path: '/:region/:businessId/incomeAllocation/',
      module: new IncomeAllocationModule({ integration, setRootView }),
      documentTitle: 'Income allocation',
    },
  ];

  return routes;
};

export default getIncomeAllocationRoutes;
