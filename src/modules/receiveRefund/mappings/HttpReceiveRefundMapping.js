import {
  CREATE_RECEIVE_REFUND,
  DELETE_RECEIVE_REFUND,
  LOAD_NEW_RECEIVE_REFUND,
  LOAD_RECEIVE_REFUND,
} from '../ReceiveRefundIntents';

const HttpReceiveRefundMapping = {
  [LOAD_NEW_RECEIVE_REFUND]: {
    method: 'GET',
    getPath: ({ businessId, supplierReturnId }) => (
      `/${businessId}/receiveRefund/load_new_receive_refund/${supplierReturnId}`
    ),
  },
  [CREATE_RECEIVE_REFUND]: {
    method: 'POST',
    getPath: ({ businessId }) => (
      `/${businessId}/receiveRefund/create_receive_refund`
    ),
  },
  [LOAD_RECEIVE_REFUND]: {
    method: 'GET',
    getPath: ({ businessId, refundId }) => (
      `/${businessId}/receiveRefund/load_receive_refund/${refundId}`
    ),
  },
  [DELETE_RECEIVE_REFUND]: {
    method: 'DELETE',
    getPath: ({ businessId, refundId }) => (
      `/${businessId}/receiveRefund/delete_receive_refund/${refundId}`
    ),
  },
};

export default HttpReceiveRefundMapping;
