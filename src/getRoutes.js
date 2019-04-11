import getBankingRoutes from './banking/getBankingRoutes';
import getBusinessListRoutes from './business/getBusinessListRoutes';
import getBusinessRoutes from './business/getBusinessRoutes';
import getContactRoutes from './contact/getContactRoutes';
import getGeneralJournalRoutes from './generalJournal/getGeneralJournalRoutes';
import getIncomeAllocationRoutes from './IncomeAllocation/getIncomeAllocationRoutes';
import getInventoryRoutes from './inventory/getInventoryRoutes';
import getInvoiceRoutes from './invoice/getInvoiceRoutes';
import getLogoutRoute from './logout/getLogoutRoute';
import getQuoteRoutes from './quote/getQuoteRoutes';
import getReceiveMoneyRoutes from './receiveMoney/getReceiveMoneyRoutes';
import getSpendMoneyRoutes from './spendMoney/getSpendMoneyRoutes';
import getTaxRoutes from './tax/getTaxRoutes';
import getTransactionListRoutes from './transactionList/getTransactionListRoutes';
import getTransferMoneyRoutes from './transferMoney/getTransferMoneyRoutes';

const getRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams,
}) => [
  {
    name: 'businessList',
    rootPath: '/businesses',
    subRoutes: getBusinessListRoutes({ setRootView, integration }),
  },
  {
    name: 'generalJournal',
    rootPath: '/:region/:businessId/generalJournal',
    subRoutes: getGeneralJournalRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'spendMoney',
    rootPath: '/:region/:businessId/spendMoney',
    subRoutes: getSpendMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'receiveMoney',
    rootPath: '/:region/:businessId/receiveMoney',
    subRoutes: getReceiveMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'transferMoney',
    rootPath: '/:region/:businessId/transferMoney',
    subRoutes: getTransferMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'transactionList',
    rootPath: '/:region/:businessId/transactionList',
    subRoutes: getTransactionListRoutes({
      integration, setRootView, popMessages, replaceURLParams,
    }),
  },
  {
    name: 'contact',
    rootPath: '/:region/:businessId/contact',
    subRoutes: getContactRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'incomeAllocation',
    rootPath: '/:region/:businessId/incomeAllocation',
    subRoutes: getIncomeAllocationRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'quote',
    rootPath: '/:region/:businessId/quote',
    subRoutes: getQuoteRoutes({
      integration, setRootView, pushMessage, popMessages,
    }),
  },
  {
    name: 'invoice',
    rootPath: '/:region/:businessId/invoice',
    subRoutes: getInvoiceRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'logout',
    rootPath: '/logout',
    subRoutes: getLogoutRoute(),
  },
  {
    name: 'tax',
    rootPath: '/:region/:businessId/tax',
    subRoutes: getTaxRoutes({ setRootView, integration }),
  },
  {
    name: 'business',
    rootPath: '/:region/:businessId',
    subRoutes: getBusinessRoutes({ setRootView, integration }),
  }, {
    name: 'banking',
    rootPath: '/:region/:businessId/banking',
    subRoutes: getBankingRoutes({ integration, setRootView }),
  }, {
    name: 'inventory',
    rootPath: '/:region/:businessId/inventory',
    subRoutes: getInventoryRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
];

export default getRoutes;
