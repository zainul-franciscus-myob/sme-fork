import {
  CREATE_BILL_SERVICE_DETAIL,
  GET_CALCULATED_BILL_DETAIL_TOTALS,
  LOAD_NEW_BILL_SERVICE_DETAIL,
  UPDATE_BILL_SERVICE_DETAIL,
} from '../../bill/billDetail/billService/BillServiceIntents';

const BillServiceMapping = {
  [LOAD_NEW_BILL_SERVICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bill/load_new_bill_service_detail`,
  },
  [CREATE_BILL_SERVICE_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/create_bill_service_detail`,
  },
  [UPDATE_BILL_SERVICE_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, billId }) => `/${businessId}/bill/update_bill_service_detail/${billId}`,
  },
  [GET_CALCULATED_BILL_DETAIL_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bill/calculate_bill_detail_totals`,
  },
};

export default BillServiceMapping;
