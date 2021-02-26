import {
  DELETE_EMPLOYEE_PAY_DETAILS,
  LOAD_EMPLOYEE_PAY_DETAIL,
} from '../employeePayDetail/EmployeePayDetailIntents';

const HttpEmployeePayNzMapping = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) =>
      `/${businessId}/nz-payroll/employeePay/load_employee_transaction_detail/${transactionId}`,
  },
  [DELETE_EMPLOYEE_PAY_DETAILS]: {
    method: 'DELETE',
    getPath: ({ businessId, payRunId, employeePayId }) =>
      `/${businessId}/nz-payroll/payRun/${payRunId}/employeePay/${employeePayId}`,
  },
};

export default HttpEmployeePayNzMapping;
