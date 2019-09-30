import InTrayModule from './InTrayModule';

const getInTrayRoutes = ({
  integration, setRootView, popMessages,
}) => {
  const routes = [
    {
      name: 'inTray',
      path: '/',
      module: new InTrayModule({ integration, setRootView, popMessages }),
    },
  ];

  return routes;
};

export default getInTrayRoutes;
