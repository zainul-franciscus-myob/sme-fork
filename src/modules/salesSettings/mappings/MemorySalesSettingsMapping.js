import {
  DELETE_TEMPLATE,
  LOAD_PAY_DIRECT_SETTINGS,
  LOAD_SALES_SETTINGS,
  SAVE_EMAIL_SETTINGS,
  SORT_TEMPLATE_LIST,
  UPDATE_SALES_SETTINGS,
} from '../SalesSettingsIntents';
import deleteTemplateResponse from './data/deleteTemplate';
import payDirectSettings from './data/payDirectSettings';
import saleSetting from './data/auSalesSettingsDetail';
import successMessage from './data/success.json';
import templateList from './data/templateList';

const loadSalesSettings = ({ onSuccess }) => onSuccess(saleSetting);
const updateSalesSettings = ({ onSuccess }) => onSuccess(successMessage);
const saveEmailSettings = ({ onSuccess }) => onSuccess(successMessage);
const sortTemplateList = ({ onSuccess }) => onSuccess(templateList);
const deleteTemplate = ({ onSuccess }) => onSuccess(deleteTemplateResponse);
const loadPayDirectSettings = ({ onSuccess }) => onSuccess(payDirectSettings);

const MemorySalesSettingsMapping = {
  [LOAD_SALES_SETTINGS]: loadSalesSettings,
  [UPDATE_SALES_SETTINGS]: updateSalesSettings,
  [SAVE_EMAIL_SETTINGS]: saveEmailSettings,
  [SORT_TEMPLATE_LIST]: sortTemplateList,
  [DELETE_TEMPLATE]: deleteTemplate,
  [LOAD_PAY_DIRECT_SETTINGS]: loadPayDirectSettings,
};

export default MemorySalesSettingsMapping;
