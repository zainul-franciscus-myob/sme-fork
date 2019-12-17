import {
  CREATE_PAY_ITEM,
  DELETE_PAY_ITEM,
  LOAD_EXISTING_PAY_ITEM,
  LOAD_NEW_PAY_ITEM,
  UPDATE_PAY_ITEM,
} from '../../modules/payItem/wagePayItem/WagePayItemIntents';
import newPayItemDetailResponse from '../data/payItem/wage/loadNewWage';
import successResponse from '../data/success';

const loadNewPayItem = ({ onSuccess }) => onSuccess(newPayItemDetailResponse);
const success = ({ onSuccess }) => onSuccess(successResponse);

const WagePayItemMapping = {
  [LOAD_NEW_PAY_ITEM]: loadNewPayItem,
  [LOAD_EXISTING_PAY_ITEM]: loadNewPayItem,
  [CREATE_PAY_ITEM]: success,
  [UPDATE_PAY_ITEM]: success,
  [DELETE_PAY_ITEM]: success,
};

export default WagePayItemMapping;
