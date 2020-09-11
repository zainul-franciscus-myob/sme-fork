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
import inventoryDetailLoadNewResponse from './data/itemDetailNewEntry';
import inventoryDetailLoadResponse from './data/inventoryDetailEntry';
import itemListFilterResponse from './data/filterItemList';
import itemListLoadResponse from './data/itemList';
import loadItemOptionsByIdsResponse from './data/loadItemOptionsByIdsResponse';
import loadItemOptionsResponse from './data/loadItemOptionsResponse';
import loadItemSearchResponse from './data/loadItemSearchResponse.json';
import success from './data/success.json';

const loadInventoryDetail = ({ onSuccess }) =>
  onSuccess(inventoryDetailLoadResponse);
const loadNewInventoryDetail = ({ onSuccess }) =>
  onSuccess(inventoryDetailLoadNewResponse);
const updateInventoryDetail = ({ onSuccess }) => onSuccess(success);
const createInventoryDetail = ({ onSuccess }) => onSuccess(success);
const deleteInventoryDetail = ({ onSuccess }) => onSuccess(success);
const loadItemList = ({ onSuccess }) => {
  onSuccess(itemListLoadResponse);
};
const filterItemList = ({ onSuccess }) => {
  onSuccess(itemListFilterResponse);
};
const loadNextPage = ({ onSuccess }) => {
  onSuccess(itemListFilterResponse);
};
const loadItemOptions = ({ onSuccess }) => onSuccess(loadItemOptionsResponse);
const loadItemOptionsByIds = ({ onSuccess }) =>
  onSuccess(loadItemOptionsByIdsResponse);
const searchComboboxItem = ({ onSuccess }) => onSuccess(loadItemSearchResponse);

const MemoryInventoryMapping = {
  [LOAD_INVENTORY_DETAIL]: loadInventoryDetail,
  [LOAD_NEW_INVENTORY_DETAIL]: loadNewInventoryDetail,
  [UPDATE_INVENTORY_DETAIL]: updateInventoryDetail,
  [CREATE_INVENTORY_DETAIL]: createInventoryDetail,
  [DELETE_INVENTORY_DETAIL]: deleteInventoryDetail,
  [LOAD_ITEM_LIST]: loadItemList,
  [SORT_AND_FILTER_ITEM_LIST]: filterItemList,
  [LOAD_NEXT_PAGE]: loadNextPage,
  [LOAD_ITEM_COMBOBOX_OPTIONS]: loadItemOptions,
  [LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS]: loadItemOptionsByIds,
  [SEARCH_COMBOBOX_ITEM]: searchComboboxItem,
};

export default MemoryInventoryMapping;
