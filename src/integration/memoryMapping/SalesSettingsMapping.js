import {
  LOAD_SALES_SETTINGS,
  SAVE_EMAIL_SETTINGS,
  UPDATE_SALES_SETTINGS,
} from '../../salesSettings/SalesSettingsIntents';
import saleSetting from '../data/salesSettings/auSalesSettingsDetail';
import successMessage from '../data/success.json';

const loadSalesSettings = ({ onSuccess }) => onSuccess(saleSetting);
const updateSalesSettings = ({ onSuccess }) => onSuccess(successMessage);
const saveEmailSettings = ({ onSuccess }) => onSuccess(successMessage);

const SaleSettingMapping = {
  [LOAD_SALES_SETTINGS]: loadSalesSettings,
  [UPDATE_SALES_SETTINGS]: updateSalesSettings,
  [SAVE_EMAIL_SETTINGS]: saveEmailSettings,
};

export default SaleSettingMapping;
