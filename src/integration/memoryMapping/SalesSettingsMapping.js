import {
  LOAD_SALES_SETTINGS,
  SAVE_EMAIL_SETTINGS,
  SORT_TEMPLATE_LIST,
  UPDATE_SALES_SETTINGS,
} from '../../salesSettings/SalesSettingsIntents';
import saleSetting from '../data/salesSettings/auSalesSettingsDetail';
import successMessage from '../data/success.json';
import templateList from '../data/salesSettings/templateList';

const loadSalesSettings = ({ onSuccess }) => onSuccess(saleSetting);
const updateSalesSettings = ({ onSuccess }) => onSuccess(successMessage);
const saveEmailSettings = ({ onSuccess }) => onSuccess(successMessage);
const sortTemplateList = ({ onSuccess }) => onSuccess(templateList);

const SaleSettingMapping = {
  [LOAD_SALES_SETTINGS]: loadSalesSettings,
  [UPDATE_SALES_SETTINGS]: updateSalesSettings,
  [SAVE_EMAIL_SETTINGS]: saveEmailSettings,
  [SORT_TEMPLATE_LIST]: sortTemplateList,
};

export default SaleSettingMapping;
