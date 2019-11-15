import { LOAD_NEW_ITEM, SAVE_ITEM } from '../../inventory/inventoryModal/InventoryModalIntents';

const InventoryModalMapping = {
  [SAVE_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/inventory/item_modal/create_item`,
  },
  [LOAD_NEW_ITEM]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/item_modal/load_new_item`,
  },
};

export default InventoryModalMapping;
