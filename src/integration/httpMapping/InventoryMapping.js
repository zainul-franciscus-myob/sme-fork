import {
  CREATE_INVENTORY_DETAIL,
  DELETE_INVENTORY_DETAIL,
  LOAD_INVENTORY_DETAIL,
  LOAD_ITEM_LIST,
  LOAD_NEW_INVENTORY_DETAIL,
  SORT_AND_FILTER_ITEM_LIST,
  UPDATE_INVENTORY_DETAIL,
} from '../../inventory/InventoryIntents';

const InventoryMapping = {
  [CREATE_INVENTORY_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/inventory/create_item`,
  },
  [DELETE_INVENTORY_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, itemId }) => `/${businessId}/inventory/delete_item/${itemId}`,
  },
  [LOAD_INVENTORY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) => `/${businessId}/inventory/load_item/${itemId}`,
  },
  [LOAD_NEW_INVENTORY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/load_new_item`,
  },
  [UPDATE_INVENTORY_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, itemId }) => `/${businessId}/inventory/update_item/${itemId}`,
  },
  [LOAD_ITEM_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/load_item_list`,
  },
  [SORT_AND_FILTER_ITEM_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/filter_item_list`,
  },
};

export default InventoryMapping;
