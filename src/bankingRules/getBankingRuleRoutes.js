import BankingRuleListModule from './bankingRuleList/BankingRuleListModule';

const getBankingRuleRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'bankingRuleList',
      path: '/',
      module: new BankingRuleListModule({
        integration, setRootView,
      }),
    },
  ];

  return routes;
};

export default getBankingRuleRoutes;
