import PayItemListModule from './payItemList/PayItemListModule';

const getPayItemRoutes = ({
  integration, setRootView, replaceURLParams,
}) => {
  const routes = [
    {
      name: 'payItemList',
      path: '/',
      allowedParams: ['tab'],
      module: new PayItemListModule({
        integration, setRootView, replaceURLParams,
      }),
    },
  ];

  return routes;
};

export default getPayItemRoutes;
