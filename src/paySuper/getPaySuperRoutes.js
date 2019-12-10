import PaySuperCreateModule from './paySuperCreate/PaySuperCreateModule';
import PaySuperListModule from './paySuperList/PaySuperListModule';

const getPaySuperRoutes = ({
  integration, setRootView, popMessages, replaceURLParams, pushMessage,
}) => {
  const routes = [
    {
      name: 'PaySuperList',
      path: '/',
      module: new PaySuperListModule({
        integration, setRootView, popMessages, replaceURLParams,
      }),
      documentTitle: 'Pay super',
    },
    {
      name: 'PaySuperCreate',
      path: '/new',
      module: new PaySuperCreateModule({
        integration, setRootView, replaceURLParams, pushMessage,
      }),
      documentTitle: 'Pay super',
    },
  ];

  return routes;
};

export default getPaySuperRoutes;
