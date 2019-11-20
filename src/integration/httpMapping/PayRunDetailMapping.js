import { LOAD_EMPLOYEE_PAY_DETAIL, LOAD_PAY_RUN_DETAILS } from '../../payRun/payRunDetail/payRunDetailIntents';

const PayRunDetailMapping = {
  [LOAD_PAY_RUN_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, payRunId }) => `/${businessId}/payrun/load_pay_run_detail/${payRunId}`,
  },
  [LOAD_EMPLOYEE_PAY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/payrun/load_employee_pay_detail/${transactionId}`,
  },
};

export default PayRunDetailMapping;
