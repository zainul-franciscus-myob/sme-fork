import {
  CREATE_RECEIVE_REFUND,
  DELETE_RECEIVE_REFUND,
  LOAD_NEW_RECEIVE_REFUND,
  LOAD_RECEIVE_REFUND,
} from '../../modules/receiveRefund/ReceiveRefundIntents';
import loadNewRefundResponse from '../data/receiveRefund/loadNewRefund';
import loadRefundResponse from '../data/receiveRefund/loadRefund';
import successResponse from '../data/success.json';

const createRefund = ({ onSuccess }) => onSuccess(successResponse);
const loadNewRefund = ({ onSuccess }) => onSuccess(loadNewRefundResponse);
const loadRefund = ({ onSuccess }) => onSuccess(loadRefundResponse);
const deleteRefund = ({ onSuccess }) => onSuccess(successResponse);

const ReceiveRefundMapping = {
  [LOAD_RECEIVE_REFUND]: loadRefund,
  [LOAD_NEW_RECEIVE_REFUND]: loadNewRefund,
  [CREATE_RECEIVE_REFUND]: createRefund,
  [DELETE_RECEIVE_REFUND]: deleteRefund,
};

export default ReceiveRefundMapping;
