import QuoteDetailModule from './quoteDetail/QuoteDetailModule';
import QuoteListModule from './quoteList/QuoteListModule';

const getQuoteRoutes = ({
  integration, setRootView, pushMessage, popMessages, reload,
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
        integration, setRootView, pushMessage, popMessages, reload,
      }),
    },
  ];

  return routes;
};

export default getQuoteRoutes;
