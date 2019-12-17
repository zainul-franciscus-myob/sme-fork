import {
  CREATE_PAY_REFUND,
  DELETE_PAY_REFUND,
  LOAD_NEW_PAY_REFUND,
  LOAD_PAY_REFUND,
  LOAD_REFERENCE_ID,
} from '../../modules/payRefund/PayRefundIntents';

const PayRefundMapping = {
  [LOAD_NEW_PAY_REFUND]: {
    method: 'GET',
    getPath: ({ businessId, customerReturnId }) => (
      `/${businessId}/payRefund/load_new_pay_refund/${customerReturnId}`
    ),
  },
  [CREATE_PAY_REFUND]: {
    method: 'POST',
    getPath: ({ businessId }) => (
      `/${businessId}/payRefund/create_pay_refund`
    ),
  },
  [LOAD_PAY_REFUND]: {
    method: 'GET',
    getPath: ({ businessId, refundId }) => (
      `/${businessId}/payRefund/load_pay_refund/${refundId}`
    ),
  },
  [DELETE_PAY_REFUND]: {
    method: 'DELETE',
    getPath: ({ businessId, refundId }) => (
      `/${businessId}/payRefund/delete_pay_refund/${refundId}`
    ),
  },
  [LOAD_REFERENCE_ID]: {
    method: 'GET',
    getPath: ({ businessId }) => (
      `/${businessId}/payRefund/get_reference_id`
    ),
  },
};

export default PayRefundMapping;
