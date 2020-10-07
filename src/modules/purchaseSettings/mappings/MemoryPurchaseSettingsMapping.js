import {
  LOAD_PURCHASE_SETTINGS,
  UPDATE_EMAIL_SETTINGS,
} from '../purchaseSettingsIntents';
import purchaseSettings from './data/purchaseSettings';
import successResponse from './data/success';

const loadPurchaseSettings = ({ onSuccess }) => onSuccess(purchaseSettings);
const updateEmailSettings = ({ onSuccess }) => onSuccess(successResponse);

const MemoryPurchaseSettingsMapping = {
  [LOAD_PURCHASE_SETTINGS]: loadPurchaseSettings,
  [UPDATE_EMAIL_SETTINGS]: updateEmailSettings,
};

export default MemoryPurchaseSettingsMapping;
