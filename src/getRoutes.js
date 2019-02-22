import getBankingRoutes from './banking/getBankingRoutes';
import getBusinessesRoutes from './business/getBusinessRoutes';
import getContactRoutes from './contact/getContactRoutes';
import getGeneralJournalRoutes from './generalJournal/getGeneralJournalRoutes';
import getIncomeAllocationRoutes from './IncomeAllocation/getIncomeAllocationRoutes';
import getLogoutRoute from './logout/getLogoutRoute';
import getReceiveMoneyRoutes from './receiveMoney/getReceiveMoneyRoutes';
import getSpendMoneyRoutes from './spendMoney/getSpendMoneyRoutes';
import getTransactionListRoutes from './transactionList/getTransactionListRoutes';
import getTransferMoneyRoutes from './transferMoney/getTransferMoneyRoutes';

const getRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams,
}) => [
  {
    name: 'banking',
    rootPath: '/:businessId/banking',
    subRoutes: getBankingRoutes({ setRootView, integration }),
  }, {
    name: 'businesses',
    rootPath: '/business',
    subRoutes: getBusinessesRoutes({ setRootView, integration }),
  }, {
    name: 'generalJournal',
    rootPath: '/:businessId/generalJournal',
    subRoutes: getGeneralJournalRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'spendMoney',
    rootPath: '/:businessId/spendMoney',
    subRoutes: getSpendMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'receiveMoney',
    rootPath: '/:businessId/receiveMoney',
    subRoutes: getReceiveMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'transferMoney',
    rootPath: '/:businessId/transferMoney',
    subRoutes: getTransferMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'transactionList',
    rootPath: '/:businessId/transactionList',
    subRoutes: getTransactionListRoutes({
      integration, setRootView, popMessages, replaceURLParams,
    }),
  },
  {
    name: 'contact',
    rootPath: '/:businessId/contact',
    subRoutes: getContactRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'incomeAllocation',
    rootPath: '/:businessId/incomeAllocation',
    subRoutes: getIncomeAllocationRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'logout',
    rootPath: '/logout',
    subRoutes: getLogoutRoute(),
  },
];

export default getRoutes;
