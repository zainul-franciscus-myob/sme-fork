import BankingRuleDetailModule from './bankingRuleDetail/BankingRuleDetailModule';
import BankingRuleListModule from './bankingRuleList/BankingRuleListModule';
import RouteName from '../../router/RouteName';

const getBankingRuleRoutes = ({
  integration,
  setRootView,
  popMessages,
  pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.BANKING_RULE_LIST,
      path: '/:region/:businessId/bankingRule/',
      module: new BankingRuleListModule({
        integration,
        setRootView,
        popMessages,
      }),
      documentTitle: 'Bank feed rules',
    },
    {
      name: RouteName.BANKING_RULE_DETAIL,
      path: '/:region/:businessId/bankingRule/:bankingRuleId',
      module: new BankingRuleDetailModule({
        integration,
        setRootView,
        pushMessage,
      }),
      documentTitle: 'Banking rule',
    },
  ];

  return routes;
};

export default getBankingRuleRoutes;
