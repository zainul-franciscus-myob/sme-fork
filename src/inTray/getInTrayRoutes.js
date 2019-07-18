import InTrayModule from './InTrayModule';

const getInTrayRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'inTray',
      path: '/',
      module: new InTrayModule({ integration, setRootView }),
    },
  ];

  return routes;
};

export default getInTrayRoutes;
