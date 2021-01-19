import {
  CREATE_SUPPLIER_PAYMENT,
  DELETE_SUPPLIER_PAYMENT,
  EXPORT_PDF,
  LOAD_NEW_SUPPLIER_PAYMENT,
  LOAD_PURCHASE_LIST,
  LOAD_SUPPLIER_PAYMENT,
  LOAD_SUPPLIER_PURCHASE_LIST,
  SEND_EMAIL,
  UPDATE_REFERENCE_ID,
  UPDATE_SUPPLIER_PAYMENT,
} from '../SupplierPaymentIntents';

const HttpSupplierPaymentMapping = {
  [LOAD_NEW_SUPPLIER_PAYMENT]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/supplierPayment/load_new_supplier_payment`,
  },
  [LOAD_SUPPLIER_PAYMENT]: {
    method: 'GET',
    getPath: ({ businessId, supplierPaymentId }) =>
      `/${businessId}/supplierPayment/load_supplier_payment/${supplierPaymentId}`,
  },
  [LOAD_PURCHASE_LIST]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) =>
      `/${businessId}/supplierPayment/load_purchase_list/${supplierId}`,
  },
  [LOAD_SUPPLIER_PURCHASE_LIST]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) =>
      `/${businessId}/supplierPayment/load_supplier_purchase_list/${supplierId}`,
  },
  [UPDATE_REFERENCE_ID]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/supplierPayment/get_reference_id`,
  },
  [CREATE_SUPPLIER_PAYMENT]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/supplierPayment/create_supplier_payment`,
  },
  [UPDATE_SUPPLIER_PAYMENT]: {
    method: 'PUT',
    getPath: ({ businessId, supplierPaymentId }) =>
      `/${businessId}/supplierPayment/update_supplier_payment/${supplierPaymentId}`,
  },
  [DELETE_SUPPLIER_PAYMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, supplierPaymentId }) =>
      `/${businessId}/supplierPayment/delete_supplier_payment/${supplierPaymentId}`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, supplierPaymentId }) =>
      `/${businessId}/supplierPayment/send_remittance_advice_email/${supplierPaymentId}`,
  },
  [EXPORT_PDF]: {
    method: 'GET',
    getPath: ({ businessId, supplierPaymentId }) =>
      `/${businessId}/supplierPayment/export_remittance_advice_pdf/${supplierPaymentId}`,
  },
};

export default HttpSupplierPaymentMapping;
