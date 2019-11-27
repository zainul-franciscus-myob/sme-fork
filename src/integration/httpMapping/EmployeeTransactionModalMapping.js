import { LOAD_EMPLOYEE_PAY_DETAIL } from '../../sharedSubModules/employeeTransactionModal/EmployeeTransactionModalIntents';

const EmployeeTransactionModalMapping = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/payrun/load_employee_pay_detail/${transactionId}`,
  },
};

export default EmployeeTransactionModalMapping;
