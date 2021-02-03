import {
  CREATE_DRAFT_PAY_RUN,
  DELETE_DRAFT_PAY_RUN,
  LOAD_BUSINESS_ONBOARDED_STATUS,
  LOAD_PAYROLL_VERIFICATION_REPORT,
  RECORD_PAYMENTS,
  START_NEW_PAY_RUN,
  UPDATE_DRAFT_PAY_RUN,
  UPDATE_EMPLOYEE_PAY,
} from '../payRunCreate/PayRunIntents';
import { SORT_AND_FILTER_PAY_RUN_LIST } from '../payRunList/PayRunListIntents';
import createDraftPayRun from './data/payRun/createDraftPayRun';
import filterPayRunList from './data/payRun/filterPayRunList';
import loadBusinessOnBoardedStatus from './data/payRun/loadBusinessOnboardedResponse';
import startNewPayRun from './data/payRun/startNewPayRun';
import updatedEmployeePay from './data/payRun/updatedEmployeePay';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [CREATE_DRAFT_PAY_RUN]: ({ onSuccess }) => onSuccess(createDraftPayRun),
  [UPDATE_EMPLOYEE_PAY]: ({ onSuccess }) => onSuccess(updatedEmployeePay),
  [RECORD_PAYMENTS]: ({ onSuccess }) => onSuccess({}),
  [UPDATE_DRAFT_PAY_RUN]: () => {},
  [DELETE_DRAFT_PAY_RUN]: () => {},
  [LOAD_PAYROLL_VERIFICATION_REPORT]: ({ onSuccess }) =>
    onSuccess(new Blob([], { type: 'application/pdf' })),
  [SORT_AND_FILTER_PAY_RUN_LIST]: ({ onSuccess }) =>
    onSuccess(filterPayRunList),
  [LOAD_BUSINESS_ONBOARDED_STATUS]: ({ onSuccess }) =>
    onSuccess(loadBusinessOnBoardedStatus),
};

export default PayRunMapping;
