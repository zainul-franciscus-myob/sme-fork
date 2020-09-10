import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getBankingRuleRoutes = () => [
  {
    name: RouteName.BANKING_RULE_LIST,
    path: '/:region/:businessId/bankingRule/',
    loadModule: () => import('./bankingRuleList/BankingRuleListModule'),
    documentTitle: 'Bank feed rules',
  },
  {
    name: RouteName.BANKING_RULE_DETAIL,
    path: '/:region/:businessId/bankingRule/:bankingRuleId',
    loadModule: () => import('./bankingRuleDetail/BankingRuleDetailModule'),
    documentTitle: 'Banking rule',
  },
];

export default getBankingRuleRoutes;
