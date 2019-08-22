import PayRunModule from './PayRunModule';

const getPayRunRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'payRun',
      path: '/',
      module: new PayRunModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getPayRunRoutes;
