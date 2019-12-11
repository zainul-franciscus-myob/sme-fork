import {
  CREATE_APPLY_TO_SALE,
  DELETE_APPLY_TO_SALE,
  LOAD_APPLY_TO_SALE,
  LOAD_NEW_APPLY_TO_SALE,
} from '../../applyToSale/ApplyToSaleIntents';
import loadApplyToSaleResponse from '../data/applyToSale/loadApplyToSaleResponse';
import loadNewApplyToSaleResponse from '../data/applyToSale/loadNewApplyToSaleResponse';
import successResponse from '../data/success';

const ApplyToSaleMapping = {
  [LOAD_NEW_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(loadNewApplyToSaleResponse),
  [LOAD_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(loadApplyToSaleResponse),
  [CREATE_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(successResponse),
};

export default ApplyToSaleMapping;
