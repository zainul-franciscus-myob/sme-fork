import {
  CREATE_BILL_SERVICE_DETAIL,
  GET_CALCULATED_BILL_DETAIL_TOTALS,
  LOAD_NEW_BILL_SERVICE_DETAIL,
  PREFILL_NEW_BILL_SERVICE_FROM_IN_TRAY,
  UPDATE_BILL_SERVICE_DETAIL,
} from '../../bill/billDetail/billService/BillServiceIntents';
import billServiceNewDetail from '../data/bill/billServiceNewDetail.json';
import billServiceNewPrefilledFromInTray from '../data/bill/billServiceNewPrefilledFromInTray';
import successResponse from '../data/success';
import totalsResponse from '../data/bill/totalsResponse';

const loadNewBillServiceDetail = ({ onSuccess }) => onSuccess(billServiceNewDetail);
const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);
const createServiceBill = ({ onSuccess }) => onSuccess(successResponse);
const prefillNewBillServiceFromInTray = ({ onSuccess }) => onSuccess(
  billServiceNewPrefilledFromInTray,
);
const updateServiceBill = ({ onSuccess }) => onSuccess(successResponse);

const BillMapping = {
  [LOAD_NEW_BILL_SERVICE_DETAIL]: loadNewBillServiceDetail,
  [GET_CALCULATED_BILL_DETAIL_TOTALS]: getCalculatedTotals,
  [CREATE_BILL_SERVICE_DETAIL]: createServiceBill,
  [UPDATE_BILL_SERVICE_DETAIL]: updateServiceBill,
  [PREFILL_NEW_BILL_SERVICE_FROM_IN_TRAY]: prefillNewBillServiceFromInTray,
};

export default BillMapping;
