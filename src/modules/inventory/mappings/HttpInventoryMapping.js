import {
  CREATE_INVENTORY_DETAIL,
  DELETE_INVENTORY_DETAIL,
  LOAD_INVENTORY_DETAIL,
  LOAD_ITEM_COMBOBOX_OPTIONS,
  LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_ITEM_LIST,
  LOAD_NEW_INVENTORY_DETAIL,
  LOAD_NEXT_PAGE,
  SEARCH_COMBOBOX_ITEM,
  SORT_AND_FILTER_ITEM_LIST,
  UPDATE_INVENTORY_DETAIL,
} from '../InventoryIntents';

const HttpInventoryMapping = {
  [CREATE_INVENTORY_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/inventory/create_item`,
  },
  [DELETE_INVENTORY_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, itemId }) =>
      `/${businessId}/inventory/delete_item/${itemId}`,
  },
  [LOAD_INVENTORY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) =>
      `/${businessId}/inventory/load_item/${itemId}`,
  },
  [LOAD_NEW_INVENTORY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/load_new_item`,
  },
  [UPDATE_INVENTORY_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, itemId }) =>
      `/${businessId}/inventory/update_item/${itemId}`,
  },
  [LOAD_ITEM_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/load_item_list`,
  },
  [SORT_AND_FILTER_ITEM_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/filter_item_list`,
  },
  [LOAD_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/filter_item_list`,
  },
  [LOAD_ITEM_COMBOBOX_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/load_item_options`,
  },
  [LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/inventory/load_item_options_by_ids`,
  },
  [SEARCH_COMBOBOX_ITEM]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/inventory/load_item_options`,
  },
};

export default HttpInventoryMapping;
