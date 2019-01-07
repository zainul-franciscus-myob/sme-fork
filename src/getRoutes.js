import getBankingRoutes from './banking/getBankingRoutes';
import getBusinessesRoutes from './business/getBusinessRoutes';
import getFeaturesListRoutes from './featureList/getFeatureListRoutes';
import getGeneralJournalRoutes from './generalJournal/getGeneralJournalRoutes';
import getHomePageRoutes from './HomePage/getHomePageRoutes';
import getSpendMoneyRoutes from './spendMoney/getSpendMoneyRoutes';

const getRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => [
  {
    name: 'home',
    rootPath: '/home',
    subRoutes: getHomePageRoutes({ setRootView }),
  },
  {
    name: 'banking',
    rootPath: '/:businessId/banking',
    subRoutes: getBankingRoutes({ setRootView, integration }),
  }, {
    name: 'bussinesses',
    rootPath: '/business',
    subRoutes: getBusinessesRoutes({ setRootView, integration }),
  }, {
    name: 'generalJournal',
    rootPath: '/:businessId/generalJournal',
    subRoutes: getGeneralJournalRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'spendMoney',
    rootPath: '/:businessId/spendMoney',
    subRoutes: getSpendMoneyRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'featureList',
    rootPath: '/:businessId/features',
    subRoutes: getFeaturesListRoutes({ setRootView, popMessages }),
  },
];

export default getRoutes;
