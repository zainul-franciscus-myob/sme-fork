import QuoteDetailModule from './quoteDetail/QuoteDetailModule';
import QuoteListModule from './quoteList/QuoteListModule';
import RouteName from '../../router/RouteName';

const getQuoteRoutes = ({
  integration, setRootView, pushMessage, popMessages, navigateTo, replaceURLParams, isToggleOn,
}) => {
  const routes = [
    {
      name: RouteName.QUOTE_LIST,
      path: '/:region/:businessId/quote/',
      module: new QuoteListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Quotes',
    },
    {
      name: RouteName.QUOTE_DETAIL,
      path: '/:region/:businessId/quote/:quoteId',
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

export default getQuoteRoutes;
