import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getQuoteWithStatusRoutes = () => [
  {
    name: RouteName.QUOTE_WITH_STATUS_LIST,
    path: '/:region/:businessId/quoteWithStatus/',
    loadModule: () => import('./quoteList/QuoteListModule'),
    documentTitle: 'Quotes',
  },
  {
    name: RouteName.QUOTE_WITH_STATUS_DETAIL,
    path: '/:region/:businessId/quoteWithStatus/:quoteId',
    allowedParams: ['layout'],
    loadModule: () => import('./quoteDetail/QuoteDetailModule'),
    documentTitle: 'Quote',
  },
];

export default getQuoteWithStatusRoutes;
