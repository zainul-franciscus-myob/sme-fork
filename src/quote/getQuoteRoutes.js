import QuoteListModule from './quoteList/QuoteListModule';
import ServiceQuoteModule from './serviceQuote/ServiceQuoteModule';

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
      name: 'serviceQuote',
      path: '/service/:quoteId',
      module: new ServiceQuoteModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getQuoteRoutes;
