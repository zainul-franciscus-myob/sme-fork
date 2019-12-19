import {
  CREATE_RECEIVE_REFUND,
  DELETE_RECEIVE_REFUND,
  LOAD_NEW_RECEIVE_REFUND,
  LOAD_RECEIVE_REFUND,
} from '../ReceiveRefundIntents';
import loadNewRefundResponse from './data/loadNewRefund';
import loadRefundResponse from './data/loadRefund';
import successResponse from './data/success.json';

const createRefund = ({ onSuccess }) => onSuccess(successResponse);
const loadNewRefund = ({ onSuccess }) => onSuccess(loadNewRefundResponse);
const loadRefund = ({ onSuccess }) => onSuccess(loadRefundResponse);
const deleteRefund = ({ onSuccess }) => onSuccess(successResponse);

const MemoryReceiveRefundMapping = {
  [LOAD_RECEIVE_REFUND]: loadRefund,
  [LOAD_NEW_RECEIVE_REFUND]: loadNewRefund,
  [CREATE_RECEIVE_REFUND]: createRefund,
  [DELETE_RECEIVE_REFUND]: deleteRefund,
};

export default MemoryReceiveRefundMapping;
