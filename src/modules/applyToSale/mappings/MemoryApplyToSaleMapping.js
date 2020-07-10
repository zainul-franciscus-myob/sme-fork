import {
  CREATE_APPLY_TO_SALE,
  DELETE_APPLY_TO_SALE,
  LOAD_APPLY_TO_SALE,
  LOAD_NEW_APPLY_TO_SALE,
} from '../ApplyToSaleIntents';
import loadApplyToSaleResponse from './data/loadApplyToSaleResponse';
import loadNewApplyToSaleResponse from './data/loadNewApplyToSaleResponse';
import successResponse from './data/success.json';

const MemoryApplyToSaleMapping = {
  [LOAD_NEW_APPLY_TO_SALE]: ({ onSuccess }) =>
    onSuccess(loadNewApplyToSaleResponse),
  [LOAD_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(loadApplyToSaleResponse),
  [CREATE_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_APPLY_TO_SALE]: ({ onSuccess }) => onSuccess(successResponse),
};

export default MemoryApplyToSaleMapping;
