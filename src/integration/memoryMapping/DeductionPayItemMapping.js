import {
  CREATE_PAY_ITEM,
  DELETE_PAY_ITEM,
  LOAD_EXISTING_PAY_ITEM,
  LOAD_NEW_PAY_ITEM,
  UPDATE_PAY_ITEM,
} from '../../modules/payItem/deductionPayItem/DeductionPayItemIntents';
import loadDeduction from '../data/payItem/deduction/loadDeduction';
import newPayItemDetailResponse from '../data/payItem/deduction/loadNewDeduction';
import successResponse from '../data/success';

const success = ({ onSuccess }) => onSuccess(successResponse);

const DeductionPayItemMapping = {
  [LOAD_NEW_PAY_ITEM]: ({ onSuccess }) => onSuccess(newPayItemDetailResponse),
  [LOAD_EXISTING_PAY_ITEM]: ({ onSuccess }) => onSuccess(loadDeduction),
  [CREATE_PAY_ITEM]: success,
  [UPDATE_PAY_ITEM]: success,
  [DELETE_PAY_ITEM]: success,
};

export default DeductionPayItemMapping;
