import BankingRuleBillModule from './bankingRuleBill/BankingRuleBillModule';
import BankingRuleInvoiceModule from './bankingRuleInvoice/BankingRuleInvoiceModule';
import BankingRuleListModule from './bankingRuleList/BankingRuleListModule';
import BankingRuleReceiveMoneyModule from './bankingRuleReceiveMoney/BankingRuleReceiveMoneyModule';
import BankingRuleSpendMoneyModule from './bankingRuleSpendMoney/BankingRuleSpendMoneyModule';
import RouteName from '../router/RouteName';

const getBankingRuleRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.BANKING_RULE_LIST,
      path: '/:region/:businessId/bankingRule/',
      module: new BankingRuleListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Bank feed rules',
    },
    {
      name: RouteName.BANKING_RULE_SPEND_MONEY,
      path: '/:region/:businessId/bankingRule/spendMoney/:bankingRuleId',
      module: new BankingRuleSpendMoneyModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Spend money banking rule',
    },
    {
      name: RouteName.BANKING_RULE_RECEIVE_MONEY,
      path: '/:region/:businessId/bankingRule/receiveMoney/:bankingRuleId',
      module: new BankingRuleReceiveMoneyModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Receive money banking rule',
    },
    {
      name: RouteName.BANKING_RULE_INVOICE,
      path: '/:region/:businessId/bankingRule/invoice/:bankingRuleId',
      module: new BankingRuleInvoiceModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Invoice banking rule',
    },
    {
      name: RouteName.BANKING_RULE_BILL,
      path: '/:region/:businessId/bankingRule/bill/:bankingRuleId',
      module: new BankingRuleBillModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Bill banking rule',
    },
  ];

  return routes;
};

export default getBankingRuleRoutes;
