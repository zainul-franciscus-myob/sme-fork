import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getQuoteRoutes = () => [
  {
    name: RouteName.QUOTE_LIST,
    path: '/:region/:businessId/quote/',
    loadModule: () => import('./quoteList/QuoteListModule'),
    documentTitle: 'Quotes',
  },
  {
    name: RouteName.QUOTE_DETAIL,
    path: '/:region/:businessId/quote/:quoteId',
    allowedParams: ['layout'],
    loadModule: () => import('./quoteDetail/QuoteDetailModule'),
    documentTitle: 'Quote',
  },
];

export default getQuoteRoutes;
