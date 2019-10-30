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
    },
    {
      name: 'quoteDetail',
      path: '/:quoteId',
      allowedParams: ['duplicatedQuoteId'],
      module: new QuoteDetailModule({
        integration, setRootView, pushMessage, popMessages, reload, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getQuoteRoutes;
