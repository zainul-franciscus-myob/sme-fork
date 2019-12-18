import { LOAD_EMPLOYEE_PAY_DETAIL } from '../../modules/employeePay/employeePayDetail/EmployeePayDetailIntents';
import { LOAD_EMPLOYEE_PAY_MODAL } from '../../modules/employeePay/employeePayModal/EmployeePayModalIntents';
import { SEND_PAY_SLIP_EMAIL } from '../../modules/employeePay/emailPaySlipModal/EmailPaySlipModalIntents';

const EmployeePayMapping = {
  [LOAD_EMPLOYEE_PAY_MODAL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/load_employee_transaction_detail/${transactionId}`,
  },
  [LOAD_EMPLOYEE_PAY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/load_employee_transaction_detail/${transactionId}`,
  },
  [SEND_PAY_SLIP_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, transactionId }) => `/${businessId}/employeePay/send_employee_pay_email/${transactionId}`,
  },
};

export default EmployeePayMapping;
