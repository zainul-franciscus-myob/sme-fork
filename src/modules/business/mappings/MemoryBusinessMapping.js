import {
  LOAD_BUSINESS_LIST,
  LOAD_BUSINESS_SETTINGS,
  SAVE_BUSINESS_DETAILS,
  SAVE_GST_SETTINGS,
  START_NEW_FINANCIAL_YEAR,
} from '../BusinessIntents';
import business from './data/businessSettingsResponse';
import businesses from './data/businessList';
import success from './data/success.json';

const saveBusinessDetails = ({ onSuccess }) => onSuccess(success);
const saveGstSettings = ({ onSuccess }) => onSuccess(success);
const loadBusinessList = ({ onSuccess }) => {
  onSuccess(businesses);
};
const loadBusinessSettings = ({ onSuccess }) => {
  onSuccess(business);
};
const startNewFinancialYear = ({ onSuccess }) => onSuccess(success);

const MemoryBusinessMapping = {
  [LOAD_BUSINESS_LIST]: loadBusinessList,
  [LOAD_BUSINESS_SETTINGS]: loadBusinessSettings,
  [SAVE_BUSINESS_DETAILS]: saveBusinessDetails,
  [SAVE_GST_SETTINGS]: saveGstSettings,
  [START_NEW_FINANCIAL_YEAR]: startNewFinancialYear,
};

export default MemoryBusinessMapping;
