import { LOAD_NEW_ITEM, SAVE_ITEM } from '../../inventory/inventoryModal/InventoryModalIntents';
import loadNewItem from '../data/inventory/loadNewItem';
import saveItem from '../data/inventory/saveItem';

const InventoryModalMapping = {
  [LOAD_NEW_ITEM]: ({ onSuccess }) => onSuccess(loadNewItem),
  [SAVE_ITEM]: ({ onSuccess }) => onSuccess(saveItem),
};

export default InventoryModalMapping;
