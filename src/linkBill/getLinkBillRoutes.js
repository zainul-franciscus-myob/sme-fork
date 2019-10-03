import LinkBillModule from './LinkBillModule';

const getLinkBillRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'linkBill',
      path: '/:documentId',
      module: new LinkBillModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getLinkBillRoutes;
