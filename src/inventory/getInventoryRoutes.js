import InventoryDetailModule from './inventoryDetail/InventoryDetailModule';
import ItemListModule from './itemList/ItemListModule';

const getInventoryRoutes = ({
  integration, setRootView, pushMessage, popMessages,
}) => {
  const routes = [
    {
      name: 'inventoryDetail',
      path: '/:itemId',
      module: new InventoryDetailModule({ integration, setRootView, pushMessage }),
    },
    {
      name: 'itemList',
      path: '/',
      module: new ItemListModule({
        integration, setRootView, popMessages,
      }),
    },
  ];

  return routes;
};

export default getInventoryRoutes;
