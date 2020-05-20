import BankFeedsCreateModule from './BankFeedsCreateModule';
import RouteName from '../../../router/RouteName';

const getBankFeedsCreateRoutes = ({
  integration, setRootView, pushMessage, navigateTo,
}) => [
  {
    name: RouteName.BANK_FEEDS_CREATE,
    path: '/:region/:businessId/bankFeeds/create',
    module: new BankFeedsCreateModule({
      integration, setRootView, pushMessage, navigateTo,
    }),
    documentTitle: 'Create a bank feed',
  },
];

export default getBankFeedsCreateRoutes;
