import LinkBillModule from './LinkBillModule';
import RouteName from '../../router/RouteName';

const getLinkBillRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.LINK_BILL,
      path: '/:region/:businessId/linkBill/:documentId',
      module: new LinkBillModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Link to existing bill',
    },
  ];

  return routes;
};

export default getLinkBillRoutes;
