import {
  CREATE_RECURRING_INVOICE,
  DELETE_RECURRING_INVOICE,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CUSTOMER,
  LOAD_ITEM,
  LOAD_NEW_RECURRING_INVOICE,
  LOAD_PAY_DIRECT,
  LOAD_RECURRING_INVOICE,
  UPDATE_RECURRING_INVOICE,
} from '../RecurringInvoiceIntents';
import loadAbnResponse from './data/loadAbnResponse';
import loadAccountOptionsResponse from './data/loadAccountOptionsResponse';
import loadAccountResponse from './data/loadAccountResponse';
import loadCustomerResponse from './data/loadCustomerResponse';
import loadItemResponse from './data/loadItemResponse';
import loadNewRecurringInvoiceResponse from './data/loadNewRecurringInvoiceResponse';
import loadPayDirectResponse from './data/loadPayDirectResponse';
import loadRecurringInvoiceResponse from './data/loadRecurringInvoiceResponse';
import successResponse from './data/success';

const getLoadRecurringInvoiceResponse = ({ urlParams, payload }) => {
  switch (urlParams.recurringTransactionId) {
    case 'service-readonly-id':
      return {
        ...payload,
        invoice: {
          ...payload.invoice,
          layout: 'service',
          lines: [
            {
              id: '323',
              type: 'header',
              description: 'Coolest Header',
              lineTypeId: -1,
            },
            {
              id: '1',
              type: 'item',
              units: '2',
              itemId: '3',
              description: 'Cooler Large',
              unitPrice: '520',
              discount: '10',
              jobId: '1',
              taxCodeId: '2',
              taxAmount: '0.9111',
              taxExclusiveAmount: '850',
              accountId: '92',
              lineTypeId: 17,
            },
            {
              id: '675',
              type: 'subTotal',
              taxAmount: '0.9111',
              taxExclusiveAmount: '850',
              lineTypeId: -1,
            },
          ],
        },
      };
    case 'service-freight-id':
      return {
        ...payload,
        invoice: {
          ...payload.invoice,
          layout: 'service',
          taxExclusiveFreightAmount: '9.09',
          freightTaxAmount: '0.91',
          freightTaxCodeId: '2',
        },
      };
    case 'item-readonly-id':
      return {
        ...payload,
        invoice: {
          ...payload.invoice,
          lines: [
            {
              id: '323',
              type: 'header',
              description: 'Coolest Header',
              lineTypeId: -1,
            },
            {
              id: '1',
              type: 'item',
              units: '2',
              itemId: '3',
              description: 'Cooler Large',
              unitPrice: '520',
              discount: '10',
              jobId: '1',
              taxCodeId: '2',
              taxAmount: '0.9111',
              taxExclusiveAmount: '850',
              accountId: '92',
              lineTypeId: 17,
            },
            {
              id: '675',
              type: 'subTotal',
              taxAmount: '0.9111',
              taxExclusiveAmount: '850',
              lineTypeId: -1,
            },
          ],
        },
      };
    case 'item-freight-id':
      return {
        ...payload,
        invoice: {
          ...payload.invoice,
          taxExclusiveFreightAmount: '9.09',
          freightTaxAmount: '0.91',
          freightTaxCodeId: '2',
        },
      };
    case 'item-id':
      return payload;
    case 'service-id':
    default:
      return {
        ...payload,
        invoice: {
          ...payload.invoice,
          layout: 'service',
        },
      };
  }
};

const MemoryRecurringInvoiceMapping = {
  [LOAD_NEW_RECURRING_INVOICE]: ({ params = {}, onSuccess }) =>
    onSuccess({
      ...loadNewRecurringInvoiceResponse,
      invoice: {
        ...loadNewRecurringInvoiceResponse.invoice,
        layout: params.layout || 'itemAndService',
      },
    }),
  [CREATE_RECURRING_INVOICE]: ({ onSuccess }) =>
    onSuccess({ ...successResponse, id: '1' }),
  [LOAD_RECURRING_INVOICE]: ({ urlParams = {}, onSuccess }) => {
    const response = getLoadRecurringInvoiceResponse({
      urlParams,
      payload: loadRecurringInvoiceResponse,
    });
    onSuccess(response);
  },
  [UPDATE_RECURRING_INVOICE]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_RECURRING_INVOICE]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_CUSTOMER]: ({ onSuccess }) => onSuccess(loadCustomerResponse),
  [LOAD_ABN_FROM_CUSTOMER]: ({ onSuccess }) => onSuccess(loadAbnResponse),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) =>
    onSuccess(loadAccountResponse),
  [LOAD_ACCOUNT_OPTIONS]: ({ onSuccess }) =>
    onSuccess(loadAccountOptionsResponse),
  [LOAD_ITEM]: ({ onSuccess }) => onSuccess(loadItemResponse),
  [LOAD_PAY_DIRECT]: ({ onSuccess }) => onSuccess(loadPayDirectResponse),
};

export default MemoryRecurringInvoiceMapping;
