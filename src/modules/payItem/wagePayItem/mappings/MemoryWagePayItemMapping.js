import {
  CREATE_PAY_ITEM,
  DELETE_PAY_ITEM,
  LOAD_EXISTING_PAY_ITEM,
  LOAD_NEW_PAY_ITEM,
  UPDATE_PAY_ITEM,
} from '../WagePayItemIntents';
import existingPayItemDetailResponse from './data/loadWage';
import newPayItemDetailResponse from './data/loadNewWage';
import successResponse from './data/success';

const loadNewPayItem = ({ onSuccess }) => onSuccess(newPayItemDetailResponse);
const loadPayItem = ({ onSuccess }) => onSuccess(existingPayItemDetailResponse);
const success = ({ onSuccess }) => onSuccess(successResponse);

const MemoryWagePayItemMapping = {
  [LOAD_NEW_PAY_ITEM]: loadNewPayItem,
  [LOAD_EXISTING_PAY_ITEM]: loadPayItem,
  [CREATE_PAY_ITEM]: success,
  [UPDATE_PAY_ITEM]: success,
  [DELETE_PAY_ITEM]: success,
};

export default MemoryWagePayItemMapping;
