import {
  CREATE_RECURRING_BILL,
  DELETE_RECURRING_BILL,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM,
  LOAD_NEW_RECURRING_BILL,
  LOAD_RECURRING_BILL,
  LOAD_SUPPLIER,
  UPDATE_RECURRING_BILL,
} from '../RecurringBillIntents';
import loadAbnResponse from './data/loadAbnResponse.json';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadBillLineResponse from './data/loadBillLineResponse.json';
import loadNewRecurringBillResponse from './data/loadNewRecurringBillResponse.json';
import loadRecurringBillResponse from './data/loadRecurringBillResponse.json';
import loadSupplierResponse from './data/loadSupplierResponse.json';
import successResponse from './data/success';

const getLoadRecurringBillResponse = ({ urlParams, payload }) => {
  switch (urlParams.recurringTransactionId) {
    case 'miscellaneous-readonly-id':
      return { ...payload.bill, layout: 'miscellaneous' };
    case 'professional-readonly-id':
      return { ...payload.bill, layout: 'professional' };
    case 'service-readonly-id':
      return {
        ...payload,
        bill: {
          ...payload.bill,
          lines: [
            {
              id: '344',
              type: 'header',
              description: 'SERVICE HEADER',
              accountId: '',
              taxAmount: '',
              taxExclusiveAmount: '',
              jobId: '',
              taxCodeId: '',
              lineSubTypeId: '-1',
            },
            {
              id: '345',
              type: 'service',
              description: 'Yak shaving - 1/2 an hour',
              accountId: '123',
              taxAmount: '0.5',
              taxExclusiveAmount: '48',
              jobId: '2',
              taxCodeId: '124',
              lineSubTypeId: '11',
            },
            {
              id: '346',
              type: 'service',
              description: 'Yak shower - 1/2 an hour',
              accountId: '456',
              taxAmount: '1',
              taxExclusiveAmount: '49',
              jobId: '3',
              taxCodeId: '123',
              lineSubTypeId: '11',
            },
            {
              id: '347',
              type: 'service',
              description: 'Yak blow dry - 1/2 an hour',
              accountId: '123',
              taxAmount: '0.5',
              taxExclusiveAmount: '12',
              jobId: '1',
              taxCodeId: '124',
              lineSubTypeId: '11',
            },
          ],
        },
      };
    case 'item-readonly-id':
      return {
        ...payload,
        bill: {
          ...payload.bill,
          lines: [
            {
              type: 'header',
              id: '1',
              units: '',
              itemId: '',
              accountId: '',
              description: 'ITEM HEADER',
              unitPrice: '',
              discount: '',
              jobId: '',
              taxCodeId: '',
              taxAmount: '',
              taxExclusiveAmount: '',
              lineSubTypeId: '-1',
            },
            {
              type: 'item',
              id: '2',
              units: '2',
              itemId: '3',
              accountId: '123',
              description: 'Cooler Large',
              unitPrice: '520',
              discount: '10',
              jobId: '2',
              taxCodeId: '123',
              taxAmount: '0.9101',
              taxExclusiveAmount: '850',
              lineSubTypeId: '13',
            },
            {
              type: 'subTotal',
              id: '3',
              units: '',
              itemId: '',
              accountId: '',
              description: '',
              unitPrice: '',
              discount: '',
              jobId: '',
              taxCodeId: '',
              taxAmount: '0.9101',
              taxExclusiveAmount: '850',
              lineSubTypeId: '-1',
            },
            {
              type: 'header',
              id: '4',
              description: 'SERVICE HEADER',
              accountId: '',
              jobId: '',
              taxCodeId: '',
              taxAmount: '',
              taxExclusiveAmount: '',
              unitPrice: '',
              discount: '',
              units: '',
              lineSubTypeId: '-1',
            },
            {
              type: 'service',
              id: '5',
              description: 'Cooler Extra Large',
              accountId: '123',
              jobId: '3',
              taxCodeId: '124',
              taxAmount: '0.9101',
              taxExclusiveAmount: '850',
              unitPrice: '',
              discount: '',
              units: '',
              lineSubTypeId: '11',
            },
            {
              type: 'subTotal',
              id: '6',
              description: '',
              accountId: '',
              jobId: '',
              taxCodeId: '',
              taxAmount: '0.9101',
              taxExclusiveAmount: '850',
              unitPrice: '',
              discount: '',
              units: '',
              lineSubTypeId: '-1',
            },
          ],
        },
      };
    case 'item-freight-id':
      return {
        ...payload,
        bill: {
          ...payload.bill,
          taxExclusiveFreightAmount: '9.09',
          freightTaxAmount: '0.91',
          freightTaxCodeId: '2',
        },
      };
    case 'service-id':
      return {
        ...payload,
        bill: { ...payload.bill, layout: 'service' },
      };
    case 'item-id':
    default:
      return payload;
  }
};

const MemoryRecurringBillMapping = {
  [LOAD_NEW_RECURRING_BILL]: ({ onSuccess }) =>
    onSuccess(loadNewRecurringBillResponse),
  [LOAD_RECURRING_BILL]: ({ urlParams = {}, onSuccess }) => {
    const response = getLoadRecurringBillResponse({
      urlParams,
      payload: loadRecurringBillResponse,
    });
    onSuccess(response);
  },
  [CREATE_RECURRING_BILL]: ({ onSuccess }) =>
    onSuccess({ ...successResponse, id: '1' }),
  [UPDATE_RECURRING_BILL]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_RECURRING_BILL]: ({ onSuccess }) => onSuccess(successResponse),

  [LOAD_SUPPLIER]: ({ onSuccess }) => onSuccess(loadSupplierResponse),
  [LOAD_ABN_FROM_SUPPLIER]: ({ onSuccess }) => onSuccess(loadAbnResponse),
  [LOAD_ITEM]: ({ onSuccess }) => onSuccess(loadBillLineResponse),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) =>
    onSuccess(loadAddedAccountResponse),
};

export default MemoryRecurringBillMapping;
