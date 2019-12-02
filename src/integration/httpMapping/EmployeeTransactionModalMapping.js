import { LOAD_EMPLOYEE_PAY_DETAIL } from '../../employeePay/employeeTransactionModal/EmployeeTransactionModalIntents';

const EmployeeTransactionModalMapping = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeeTransactionDetail/load_employee_transaction_detail/${transactionId}`,
  },
};

export default EmployeeTransactionModalMapping;
