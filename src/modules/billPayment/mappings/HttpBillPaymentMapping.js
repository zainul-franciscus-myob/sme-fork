import {
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  EXPORT_PDF,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_PAYMENT_INFO,
  SEND_EMAIL,
  UPDATE_BILL_PAYMENT,
  UPDATE_REFERENCE_ID,
} from '../BillPaymentIntents';

const HttpBillPaymentMapping = {
  [LOAD_NEW_BILL_PAYMENT]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/billPayment/load_new_bill_payment`,
  },
  [LOAD_BILL_PAYMENT]: {
    method: 'GET',
    getPath: ({ businessId, billPaymentId }) =>
      `/${businessId}/billPayment/load_bill_payment/${billPaymentId}`,
  },
  [LOAD_BILL_LIST]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) =>
      `/${businessId}/billPayment/load_bill_list/${supplierId}`,
  },
  [UPDATE_REFERENCE_ID]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/billPayment/get_reference_id`,
  },
  [CREATE_BILL_PAYMENT]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/billPayment/create_bill_payment`,
  },
  [UPDATE_BILL_PAYMENT]: {
    method: 'PUT',
    getPath: ({ businessId, billPaymentId }) =>
      `/${businessId}/billPayment/update_bill_payment/${billPaymentId}`,
  },
  [DELETE_BILL_PAYMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, billPaymentId }) =>
      `/${businessId}/billPayment/delete_bill_payment/${billPaymentId}`,
  },
  [LOAD_SUPPLIER_PAYMENT_INFO]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) =>
      `/${businessId}/billPayment/load_supplier_payment_details/${supplierId}`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, billPaymentId }) =>
      `/${businessId}/billPayment/send_remittance_advice_email/${billPaymentId}`,
  },
  [EXPORT_PDF]: {
    method: 'GET',
    getPath: ({ businessId, billPaymentId }) =>
      `/${businessId}/billPayment/export_remittance_advice_pdf/${billPaymentId}`,
  },
};

export default HttpBillPaymentMapping;
