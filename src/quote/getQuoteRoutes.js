import QuoteListModule from './quoteList/QuoteListModule';
import ServiceQuoteModule from './serviceQuote/ServiceQuoteModule';

const getQuoteRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'quoteList',
      path: '/',
      module: new QuoteListModule({
        integration, setRootView,
      }),
    },
    {
      name: 'serviceQuote',
      path: '/service/:quoteId',
      module: new ServiceQuoteModule({
        integration, setRootView,
      }),
    },
  ];

  return routes;
};

export default getQuoteRoutes;
