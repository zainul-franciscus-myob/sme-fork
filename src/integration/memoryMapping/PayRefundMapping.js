import {
  CREATE_PAY_REFUND,
  DELETE_PAY_REFUND,
  LOAD_NEW_PAY_REFUND,
  LOAD_PAY_REFUND,
} from '../../payRefund/PayRefundIntents';
import loadNewRefundResponse from '../data/payRefund/loadNewRefund';
import loadRefundResponse from '../data/payRefund/loadRefund';
import successResponse from '../data/success.json';

const createRefund = ({ onSuccess }) => onSuccess(successResponse);
const loadNewRefund = ({ onSuccess }) => onSuccess(loadNewRefundResponse);
const loadRefund = ({ onSuccess }) => onSuccess(loadRefundResponse);
const deleteRefund = ({ onSuccess }) => onSuccess(successResponse);

const PayRefundMapping = {
  [LOAD_PAY_REFUND]: loadRefund,
  [LOAD_NEW_PAY_REFUND]: loadNewRefund,
  [CREATE_PAY_REFUND]: createRefund,
  [DELETE_PAY_REFUND]: deleteRefund,
};

export default PayRefundMapping;
