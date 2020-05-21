import BankFeedsApplyModule from './BankFeedsApplyModule';
import RouteName from '../../../router/RouteName';

const getBankFeedsApplyRoutes = ({
  integration, setRootView, pushMessage, navigateTo,
}) => [
  {
    name: RouteName.BANK_FEEDS_CREATE,
    path: '/:region/:businessId/bankFeeds/create',
    module: new BankFeedsApplyModule({
      integration, setRootView, pushMessage, navigateTo,
    }),
    documentTitle: 'Create a bank feed',
  },
];

export default getBankFeedsApplyRoutes;
