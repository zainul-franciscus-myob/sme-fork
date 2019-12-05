import {
  CREATE_INVENTORY_DETAIL,
  DELETE_INVENTORY_DETAIL,
  LOAD_INVENTORY_DETAIL,
  LOAD_ITEM_LIST,
  LOAD_NEW_INVENTORY_DETAIL,
  LOAD_NEXT_PAGE,
  SORT_AND_FILTER_ITEM_LIST,
  UPDATE_INVENTORY_DETAIL,
} from '../../inventory/InventoryIntents';
import inventoryDetailLoadNewResponse from '../data/inventory/itemDetailNewEntry';
import inventoryDetailLoadResponse from '../data/inventory/inventoryDetailEntry';
import itemListFilterResponse from '../data/inventory/filterItemList';
import itemListLoadResponse from '../data/inventory/itemList';
import success from '../data/success';

const loadInventoryDetail = ({ onSuccess }) => onSuccess(inventoryDetailLoadResponse);
const loadNewInventoryDetail = ({ onSuccess }) => onSuccess(inventoryDetailLoadNewResponse);
const updateInventoryDetail = ({ onSuccess }) => onSuccess(success);
const createInventoryDetail = ({ onSuccess }) => onSuccess(success);
const deleteInventoryDetail = ({ onSuccess }) => onSuccess(success);
const loadItemList = ({ onSuccess }) => { onSuccess(itemListLoadResponse); };
const filterItemList = ({ onSuccess }) => { onSuccess(itemListFilterResponse); };
const loadNextPage = ({ onSuccess }) => { onSuccess(itemListFilterResponse); };

const InventoryMapping = {
  [LOAD_INVENTORY_DETAIL]: loadInventoryDetail,
  [LOAD_NEW_INVENTORY_DETAIL]: loadNewInventoryDetail,
  [UPDATE_INVENTORY_DETAIL]: updateInventoryDetail,
  [CREATE_INVENTORY_DETAIL]: createInventoryDetail,
  [DELETE_INVENTORY_DETAIL]: deleteInventoryDetail,
  [LOAD_ITEM_LIST]: loadItemList,
  [SORT_AND_FILTER_ITEM_LIST]: filterItemList,
  [LOAD_NEXT_PAGE]: loadNextPage,
};

export default InventoryMapping;
