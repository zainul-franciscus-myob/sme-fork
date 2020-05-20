import BankFeedsConnectModule from './BankFeedsConnectModule';
import RouteName from '../../../router/RouteName';

const getBankFeedsConnectRoutes = ({
  integration, setRootView, pushMessage, navigateTo,
}) => [
  {
    name: RouteName.BANK_FEEDS_CONNECT,
    path: '/:region/:businessId/bankFeeds/connect',
    module: new BankFeedsConnectModule({
      integration, setRootView, pushMessage, navigateTo,
    }),
    documentTitle: 'Connect Bank Feeds',
  },
];

export default getBankFeedsConnectRoutes;
