import PrepareBasOrIasModule from './PrepareBasOrIasModule';

const getPrepareBasOrIasRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'prepareBasOrIas',
      path: '/',
      module: new PrepareBasOrIasModule({
        integration, setRootView,
      }),
      documentTitle: 'Prepare BAS or IAS',
    },
  ];

  return routes;
};

export default getPrepareBasOrIasRoutes;
