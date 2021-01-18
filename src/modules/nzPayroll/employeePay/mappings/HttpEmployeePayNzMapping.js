import { LOAD_EMPLOYEE_PAY_DETAIL } from '../employeePayDetail/EmployeePayDetailIntents';

const HttpEmployeePayNzMapping = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) =>
      `/${businessId}/nz-payroll/employeePay/load_employee_transaction_detail/${transactionId}`,
  },
};

export default HttpEmployeePayNzMapping;
