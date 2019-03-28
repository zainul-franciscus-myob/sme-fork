import {
  CREATE_INVENTORY_DETAIL,
  DELETE_INVENTORY_DETAIL,
  LOAD_INVENTORY_DETAIL,
  LOAD_NEW_INVENTORY_DETAIL,
  UPDATE_INVENTORY_DETAIL,
} from '../../inventory/InventoryIntents';
import inventoryDetailLoadNewResponse from '../data/inventory/itemDetailNewEntry';
import inventoryDetailLoadResponse from '../data/inventory/inventoryDetailEntry';
import success from '../data/success';

const loadInventoryDetail = ({ onSuccess }) => onSuccess(inventoryDetailLoadResponse);
const loadNewInventoryDetail = ({ onSuccess }) => onSuccess(inventoryDetailLoadNewResponse);
const updateInventoryDetail = ({ onSuccess }) => onSuccess(success);
const createInventoryDetail = ({ onSuccess }) => onSuccess(success);
const deleteInventoryDetail = ({ onSuccess }) => onSuccess(success);

const InventoryMapping = {
  [LOAD_INVENTORY_DETAIL]: loadInventoryDetail,
  [LOAD_NEW_INVENTORY_DETAIL]: loadNewInventoryDetail,
  [UPDATE_INVENTORY_DETAIL]: updateInventoryDetail,
  [CREATE_INVENTORY_DETAIL]: createInventoryDetail,
  [DELETE_INVENTORY_DETAIL]: deleteInventoryDetail,
};

export default InventoryMapping;
