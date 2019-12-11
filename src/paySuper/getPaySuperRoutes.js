import PaySuperCreateModule from './paySuperCreate/PaySuperCreateModule';
import PaySuperListModule from './paySuperList/PaySuperListModule';
import PaySuperReadModule from './paySuperRead/PaySuperReadModule';

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
    {
      name: 'PaySuperRead',
      // path: '/:paySuperId',
      path: '/read',
      module: new PaySuperReadModule({
        integration,
        setRootView,
      }),
    },
  ];
  return routes;
};

export default getPaySuperRoutes;
