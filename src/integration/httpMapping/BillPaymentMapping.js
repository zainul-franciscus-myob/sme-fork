import {
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  UPDATE_BILL_PAYMENT,
  UPDATE_REFERECE_ID,
} from '../../billPayment/BillPaymentIntents';

const BillPaymentMapping = {
  [LOAD_NEW_BILL_PAYMENT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/billPayment/load_new_bill_payment`,
  },
  [LOAD_BILL_PAYMENT]: {
    method: 'GET',
    getPath: ({ businessId, billPaymentId }) => `/${businessId}/billPayment/load_bill_payment/${billPaymentId}`,
  },
  [LOAD_BILL_LIST]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) => `/${businessId}/billPayment/load_bill_list/${supplierId}`,
  },
  [UPDATE_REFERECE_ID]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/billPayment/get_reference_id`,
  },
  [CREATE_BILL_PAYMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/billPayment/create_bill_payment`,
  },
  [UPDATE_BILL_PAYMENT]: {
    method: 'PUT',
    getPath: ({ businessId, billPaymentId }) => `/${businessId}/billPayment/update_bill_payment/${billPaymentId}`,
  },
  [DELETE_BILL_PAYMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, billPaymentId }) => `/${businessId}/billPayment/delete_bill_payment/${billPaymentId}`,
  },
};

export default BillPaymentMapping;
