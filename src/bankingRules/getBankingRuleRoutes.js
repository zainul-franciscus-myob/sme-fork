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
      documentTitle: 'Bank feed rules',
    },
    {
      name: 'bankingRuleSpendMoney',
      path: '/spendMoney/:bankingRuleId',
      module: new BankingRuleSpendMoneyModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Spend money banking rule',
    },
    {
      name: 'bankingRuleReceiveMoney',
      path: '/receiveMoney/:bankingRuleId',
      module: new BankingRuleReceiveMoneyModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Receive money banking rule',
    },
    {
      name: 'bankingRuleInvoice',
      path: '/invoice/:bankingRuleId',
      module: new BankingRuleInvoiceModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Invoice banking rule',
    },
    {
      name: 'bankingRuleBill',
      path: '/bill/:bankingRuleId',
      module: new BankingRuleBillModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Bill banking rule',
    },
  ];

  return routes;
};

export default getBankingRuleRoutes;
