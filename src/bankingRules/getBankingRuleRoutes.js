import BankingRuleBillModule from './bankingRuleBill/BankingRuleBillModule';
import BankingRuleInvoiceModule from './bankingRuleInvoice/BankingRuleInvoiceModule';
import BankingRuleListModule from './bankingRuleList/BankingRuleListModule';
import BankingRuleReceiveMoneyModule from './bankingRuleReceiveMoney/BankingRuleReceiveMoneyModule';
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
    {
      name: 'bankingRuleReceiveMoney',
      path: '/receiveMoney/:bankingRuleId',
      module: new BankingRuleReceiveMoneyModule({
        integration, setRootView, pushMessage,
      }),
    },
    {
      name: 'bankingRuleInvoice',
      path: '/invoice/:bankingRuleId',
      module: new BankingRuleInvoiceModule({
        integration, setRootView, pushMessage,
      }),
    },
    {
      name: 'bankingRuleBill',
      path: '/bill/:bankingRuleId',
      module: new BankingRuleBillModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getBankingRuleRoutes;
