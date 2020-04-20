import BankingLearnModule from '../learning/bankingLearn/bankingLearnModule';
import BankingModule from './BankingModule';
import RouteName from '../../router/RouteName';

const getBankingRoutes = ({
  integration, setRootView, globalCallbacks: { learnBankingCompleted },
}) => [
  {
    name: RouteName.BANKING_TRANSACTION_LIST,
    path: '/:region/:businessId/banking/',
    module: new BankingModule({
      integration, setRootView,
    }),
    documentTitle: 'Bank feed transactions',
  },
  {
    name: RouteName.ONBOARDING_LEARN_BANKING,
    path: '/:region/:businessId/banking/learn',
    module: new BankingLearnModule({
      integration, setRootView, learnBankingCompleted,
    }),
    documentTitle: 'Learn banking',
  },
];

export default getBankingRoutes;
