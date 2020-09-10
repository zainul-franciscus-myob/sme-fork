import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getInventoryRoutes = () => [
  {
    name: RouteName.INVENTORY_DETAIL,
    path: '/:region/:businessId/inventory/:itemId',
    loadModule: () => import('./inventoryDetail/InventoryDetailModule'),
    documentTitle: 'Item',
  },
  {
    name: RouteName.INVENTORY_LIST,
    path: '/:region/:businessId/inventory/',
    loadModule: () => import('./itemList/ItemListModule'),
    documentTitle: 'Items',
  },
];

export default getInventoryRoutes;
