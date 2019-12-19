import {
  CREATE_PAY_REFUND,
  DELETE_PAY_REFUND,
  LOAD_NEW_PAY_REFUND,
  LOAD_PAY_REFUND,
  LOAD_REFERENCE_ID,
} from '../PayRefundIntents';
import loadNewRefundResponse from './data/loadNewRefund';
import loadReferenceIdResponse from './data/loadReferenceId';
import loadRefundResponse from './data/loadRefund';
import successResponse from './data/success.json';

const createRefund = ({ onSuccess }) => onSuccess(successResponse);
const loadNewRefund = ({ onSuccess }) => onSuccess(loadNewRefundResponse);
const loadRefund = ({ onSuccess }) => onSuccess(loadRefundResponse);
const deleteRefund = ({ onSuccess }) => onSuccess(successResponse);
const loadReferenceId = ({ onSuccess }) => onSuccess(loadReferenceIdResponse);

const MemoryPayRefundMapping = {
  [LOAD_PAY_REFUND]: loadRefund,
  [LOAD_NEW_PAY_REFUND]: loadNewRefund,
  [CREATE_PAY_REFUND]: createRefund,
  [DELETE_PAY_REFUND]: deleteRefund,
  [LOAD_REFERENCE_ID]: loadReferenceId,
};

export default MemoryPayRefundMapping;
