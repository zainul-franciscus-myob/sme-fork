import {
  CREATE_APPLY_TO_SALE,
  DELETE_APPLY_TO_SALE,
  LOAD_APPLY_TO_SALE,
  LOAD_INVOICES,
  LOAD_NEW_APPLY_TO_SALE,
} from '../../applyToSale/ApplyToSaleIntents';
import loadApplyToSaleResponse from '../data/applyToSale/loadApplyToSaleResponse';
import loadInvoicesResponse from '../data/applyToSale/loadInvoicesResponse';
import loadNewApplyToSaleResponse from '../data/applyToSale/loadNewApplyToSaleResponse';
import successResponse from '../data/success';

const ApplyToSaleMapping = {
  [LOAD_NEW_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(loadNewApplyToSaleResponse),
  [LOAD_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(loadApplyToSaleResponse),
  [LOAD_INVOICES]: ({ onSuccess }) => onSuccess(loadInvoicesResponse),
  [CREATE_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(successResponse),
};

export default ApplyToSaleMapping;
