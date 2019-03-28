import InventoryDetailModule from './inventoryDetail/InventoryDetailModule';

const getInventoryRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'inventoryDetail',
      path: '/:itemId',
      module: new InventoryDetailModule({ integration, setRootView, pushMessage }),
    },
  ];

  return routes;
};

export default getInventoryRoutes;
