import QuoteListModule from './quoteList/QuoteListModule';

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
  ];

  return routes;
};

export default getQuoteRoutes;
