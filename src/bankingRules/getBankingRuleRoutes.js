import BankingRuleListModule from './bankingRuleList/BankingRuleListModule';
import BankingRuleSpendMoneyModule from './bankingRuleSpendMoney/BankingRuleSpendMoneyModule';

const getBankingRuleRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: 'bankingRuleList',
      path: '/',
      module: new BankingRuleListModule({
        integration, setRootView, popMessages,
      }),
    },
    {
      name: 'bankingRuleSpendMoney',
      path: '/spendMoney/:bankingRuleId',
      module: new BankingRuleSpendMoneyModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getBankingRuleRoutes;
