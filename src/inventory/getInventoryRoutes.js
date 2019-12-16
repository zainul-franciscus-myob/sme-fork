import InventoryDetailModule from './inventoryDetail/InventoryDetailModule';
import ItemListModule from './itemList/ItemListModule';
import RouteName from '../router/RouteName';

const getInventoryRoutes = ({
  integration, setRootView, pushMessage, popMessages,
}) => {
  const routes = [
    {
      name: RouteName.INVENTORY_DETAIL,
      path: '/:region/:businessId/inventory/:itemId',
      module: new InventoryDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Item',
    },
    {
      name: RouteName.INVENTORY_LIST,
      path: '/:region/:businessId/inventory/',
      module: new ItemListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Items',
    },
  ];

  return routes;
};

export default getInventoryRoutes;
