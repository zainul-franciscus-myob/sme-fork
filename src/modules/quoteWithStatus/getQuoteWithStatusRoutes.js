import QuoteDetailModule from './quoteDetail/QuoteDetailModule';
import QuoteListModule from './quoteList/QuoteListModule';
import RouteName from '../../router/RouteName';

const getQuoteWithStatusRoutes = ({
  integration,
  setRootView,
  pushMessage,
  popMessages,
  navigateTo,
  replaceURLParams,
  isToggleOn,
}) => {
  const routes = [
    {
      name: RouteName.QUOTE_WITH_STATUS_LIST,
      path: '/:region/:businessId/quoteWithStatus/',
      module: new QuoteListModule({
        integration,
        setRootView,
        popMessages,
      }),
      documentTitle: 'Quotes',
    },
    {
      name: RouteName.QUOTE_WITH_STATUS_DETAIL,
      path: '/:region/:businessId/quoteWithStatus/:quoteId',
      allowedParams: ['layout'],
      module: new QuoteDetailModule({
        integration,
        setRootView,
        pushMessage,
        popMessages,
        navigateTo,
        replaceURLParams,
        isToggleOn,
      }),
      documentTitle: 'Quote',
    },
  ];

  return routes;
};

export default getQuoteWithStatusRoutes;
