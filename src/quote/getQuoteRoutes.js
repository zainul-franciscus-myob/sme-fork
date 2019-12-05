import QuoteDetailModule from './quoteDetail/QuoteDetailModule';
import QuoteListModule from './quoteList/QuoteListModule';

const getQuoteRoutes = ({
  integration, setRootView, pushMessage, popMessages, reload, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'quoteList',
      path: '/',
      module: new QuoteListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Quotes',
    },
    {
      name: 'quoteDetail',
      path: '/:quoteId',
      allowedParams: ['layout', 'duplicatedQuoteId'],
      module: new QuoteDetailModule({
        integration, setRootView, pushMessage, popMessages, reload, replaceURLParams,
      }),
      documentTitle: 'Quote',
    },
  ];

  return routes;
};

export default getQuoteRoutes;
