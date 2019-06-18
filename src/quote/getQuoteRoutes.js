import QuoteDetailModule from './quoteDetail/QuoteDetailModule';
import QuoteListModule from './quoteList/QuoteListModule';

const getQuoteRoutes = ({
  integration, setRootView, pushMessage, popMessages,
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
      module: new QuoteDetailModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getQuoteRoutes;
