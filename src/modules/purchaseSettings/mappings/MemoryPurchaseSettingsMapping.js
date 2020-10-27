import {
  EXPORT_SAMPLE_PDF,
  LOAD_PURCHASE_SETTINGS,
  UPDATE_EMAIL_SETTINGS,
} from '../purchaseSettingsIntents';
import purchaseSettings from './data/purchaseSettings';
import successResponse from './data/success';

const loadPurchaseSettings = ({ onSuccess }) => onSuccess(purchaseSettings);
const loadSamplePdf = ({ onSuccess }) => onSuccess(purchaseSettings);
const updateEmailSettings = ({ onSuccess }) => onSuccess(successResponse);

const MemoryPurchaseSettingsMapping = {
  [LOAD_PURCHASE_SETTINGS]: loadPurchaseSettings,
  [EXPORT_SAMPLE_PDF]: loadSamplePdf,
  [UPDATE_EMAIL_SETTINGS]: updateEmailSettings,
};

export default MemoryPurchaseSettingsMapping;
