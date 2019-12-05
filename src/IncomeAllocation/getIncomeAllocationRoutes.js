import IncomeAllocationModule from './IncomeAllocationModule';

const getIncomeAllocationRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'incomeAllocation',
      path: '/',
      module: new IncomeAllocationModule({ integration, setRootView }),
      documentTitle: 'Income allocation',
    },
  ];

  return routes;
};

export default getIncomeAllocationRoutes;
